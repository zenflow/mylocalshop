alter table "public"."users"
           add constraint "users_updatedBy_fkey"
           foreign key ("updatedBy")
           references "public"."users"
           ("id") on update restrict on delete restrict;
