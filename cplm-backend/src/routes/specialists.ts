import { FastifyPluginAsync } from 'fastify';
import { specialist_info, CPUserInfo } from '../db/drizzle/schema';
import { eq, or, isNull, ilike, and, sql } from 'drizzle-orm';

const specialistsRoutes: FastifyPluginAsync = async (app) => {
  // Get all specialists
  app.get('/all_specialists', async (request, reply) => {
    try {
      const specialists = await app.db.select().from(specialist_info);
      // Convert Classification to array
      const specialistsWithArray = specialists.map((s: any) => ({
        ...s,
        Classification: s.Classification
          ? s.Classification.split(',').flatMap((c: string) => c.split(/\s*,\s*/)).map((c: string) => c.trim()).filter(Boolean)
          : [],
      }));
      return { success: true, data: specialistsWithArray };
    } catch (error) {
      app.log.error(error);
      return reply.internalServerError('Failed to fetch specialists');
    }
  });

  app.post('/specialist_Search', async (request, reply) => {
    try {
      const { search_input = '', classification } = request.body as { search_input?: string, classification?: string };

      const conditions: any[] = [];

      if (search_input && search_input.trim() !== '') {
        const keywords = search_input.split(/\s+/);
        const keywordClauses = keywords.map(keyword => {
          const pattern = `%${keyword}%`;
          return or(
            ilike(specialist_info.SpecialistName, pattern),
            ilike(specialist_info.Specialties, pattern),
            ilike(specialist_info.Address, pattern),
            ilike(specialist_info.Expertise, pattern),
            ilike(specialist_info.Classification, pattern)
          );
        });
        conditions.push(and(...keywordClauses));
      }

      let specialists;
      if (conditions.length > 0) {
        specialists = await app.db.select().from(specialist_info).where(and(...conditions));
      } else {
        specialists = await app.db.select().from(specialist_info);
      }
      // Convert Classification to array
      let specialistsWithArray = specialists.map((s: any) => ({
        ...s,
        Classification: s.Classification
          ? s.Classification.split(',').map((c: string) => c.trim()).filter(Boolean)
          : [],
      }));
      // If classification is provided, filter for exact match in array and only include non-empty arrays
      if (classification) {
        specialistsWithArray = specialistsWithArray.filter(
          s => Array.isArray(s.Classification) && s.Classification.length > 0 && s.Classification.includes(classification)
        );
      }
      return specialistsWithArray;
    } catch (error) {
      request.log.error(error);
      return reply.internalServerError('Failed to search specialists');
    }
  });
}

export default specialistsRoutes;