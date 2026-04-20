CREATE TABLE "admin_users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"password_hash" text NOT NULL,
	"display_name" varchar(64),
	"role" text DEFAULT 'editor' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"publisher_admin_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"title" varchar(128),
	"link_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"start_at" timestamp with time zone,
	"end_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"category_id" bigint NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255),
	"cover_url" text,
	"summary" text,
	"word_count" integer DEFAULT 0 NOT NULL,
	"total_copies" integer DEFAULT 0 NOT NULL,
	"available_copies" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'on_sale' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "book_taxonomy_links" (
	"book_id" bigint NOT NULL,
	"node_id" bigint NOT NULL,
	CONSTRAINT "book_taxonomy_links_pkey" PRIMARY KEY("book_id","node_id")
);
--> statement-breakpoint
CREATE TABLE "book_taxonomy_nodes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"parent_id" bigint,
	"name" varchar(128) NOT NULL,
	"slug" varchar(64),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "borrow_records" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"book_id" bigint NOT NULL,
	"borrowed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"returned_at" timestamp with time zone,
	"status" text NOT NULL,
	"remark" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "book_reviews" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"book_id" bigint NOT NULL,
	"rating" integer NOT NULL,
	"content" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"reject_reason" text,
	"moderator_admin_id" bigint,
	"moderated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"phone" varchar(20) NOT NULL,
	"password_hash" text,
	"nickname" varchar(64),
	"avatar_url" text,
	"role" text DEFAULT 'user' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "user_collects" (
	"user_id" bigint NOT NULL,
	"book_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_collects_pkey" PRIMARY KEY("user_id","book_id")
);
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_publisher_admin_id_admin_users_id_fk" FOREIGN KEY ("publisher_admin_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_book_taxonomy_nodes_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."book_taxonomy_nodes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_taxonomy_links" ADD CONSTRAINT "book_taxonomy_links_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_taxonomy_links" ADD CONSTRAINT "book_taxonomy_links_node_id_book_taxonomy_nodes_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."book_taxonomy_nodes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_taxonomy_nodes" ADD CONSTRAINT "book_taxonomy_nodes_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."book_taxonomy_nodes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_moderator_admin_id_admin_users_id_fk" FOREIGN KEY ("moderator_admin_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_collects" ADD CONSTRAINT "user_collects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_collects" ADD CONSTRAINT "user_collects_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_announcements_status_published_at" ON "announcements" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "idx_banners_status_sort" ON "banners" USING btree ("status","sort_order");--> statement-breakpoint
CREATE INDEX "idx_books_category_id" ON "books" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_books_status" ON "books" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_book_taxonomy_links_node_id" ON "book_taxonomy_links" USING btree ("node_id");--> statement-breakpoint
CREATE INDEX "idx_book_taxonomy_parent" ON "book_taxonomy_nodes" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_book_taxonomy_parent_active_sort" ON "book_taxonomy_nodes" USING btree ("parent_id","is_active","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_book_taxonomy_parent_name" ON "book_taxonomy_nodes" USING btree ("parent_id","name");--> statement-breakpoint
CREATE INDEX "idx_borrow_records_user_id" ON "borrow_records" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_borrow_records_book_id" ON "borrow_records" USING btree ("book_id");--> statement-breakpoint
CREATE INDEX "idx_borrow_records_status" ON "borrow_records" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_book_reviews_book_status" ON "book_reviews" USING btree ("book_id","status");--> statement-breakpoint
CREATE INDEX "idx_book_reviews_user_id" ON "book_reviews" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_users_status" ON "users" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_user_collects_book_id" ON "user_collects" USING btree ("book_id");