alter table "public"."users"
           add constraint "users_createdBy_fkey"
           foreign key ("createdBy")
           references "public"."users"
           ("id") on update restrict on delete restrict;
