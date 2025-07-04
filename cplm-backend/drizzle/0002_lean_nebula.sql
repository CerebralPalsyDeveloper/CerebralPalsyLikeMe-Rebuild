CREATE TABLE "cp_user_info" (
	"user_id" varchar,
	"can_walk" boolean,
	"hand_trouble" boolean,
	"cp_type" varchar,
	"can_talk" boolean,
	"can_see" boolean,
	"can_hear" boolean,
	"need_assistance" boolean,
	"address" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cp_user_info" ADD CONSTRAINT "cp_user_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;