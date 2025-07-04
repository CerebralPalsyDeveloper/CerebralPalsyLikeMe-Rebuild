#!/bin/bash
npm run db:migrate
exec "$@"  # This runs the CMD (npm start)