
-- =====================================================================
-- GHX Innovation Exchange Database Schema
-- Version: 5.0 (Final, Production Ready)
-- Author: Gemini
-- Description: This script creates the complete database structure.
-- v5.0 adds a robust, hybrid address model for Users and Organizations,
-- balancing query performance with global flexibility.
-- =====================================================================

-- Drop tables in reverse order of creation to avoid foreign key conflicts
DROP TABLE IF EXISTS "User_Organization_Memberships";
DROP TABLE IF EXISTS "User_Ecosystem_Roles";
DROP TABLE IF EXISTS "Startup_Details";
DROP TABLE IF EXISTS "Cohorts";
DROP TABLE IF EXISTS "Organization_Applications";
DROP TABLE IF EXISTS "Individual_Role_Applications";
DROP TABLE IF EXISTS "Forms";
DROP TABLE IF EXISTS "Organizations";
DROP TABLE IF EXISTS "Users";

-- =====================================================================
-- TABLE: Users
-- =====================================================================
CREATE TABLE "Users" (
    "user_id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "country_code" VARCHAR(10),
    "phone_number" VARCHAR(20),
    "profile_picture_url" VARCHAR(255),
    "country" VARCHAR(100),
    "state_province" VARCHAR(100),
    "city" VARCHAR(100),
    "address_details" JSONB, -- For street, postal_code, etc.
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "last_login_at" TIMESTAMPTZ
);

-- =====================================================================
-- TABLE: Organizations
-- =====================================================================
CREATE TABLE "Organizations" (
    "organization_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "organization_type" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "website_url" VARCHAR(255),
    "logo_url" VARCHAR(255),
    "country" VARCHAR(100),
    "state_province" VARCHAR(100),
    "city" VARCHAR(100),
    "address_details" JSONB, -- For street, postal_code, etc.
    "is_verified" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMPTZ NULL
);

-- =====================================================================
-- TABLE: Forms (JSON-based approach)
-- =====================================================================
CREATE TABLE "Forms" (
    "form_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "version" INT NOT NULL DEFAULT 1,
    "description" TEXT,
    "structure" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE("name", "version")
);

-- =====================================================================
-- TABLES for Cohort Tracking
-- =====================================================================
CREATE TABLE "Cohorts" (
    "cohort_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "start_date" DATE,
    "end_date" DATE
);

CREATE TABLE "Startup_Details" (
    "organization_id" INT PRIMARY KEY,
    "cohort_id" INT,
    "alumni_status" VARCHAR(50) DEFAULT 'ACTIVE_MEMBER',
    CONSTRAINT "fk_startup_organization" FOREIGN KEY("organization_id") REFERENCES "Organizations"("organization_id") ON DELETE CASCADE,
    CONSTRAINT "fk_startup_cohort" FOREIGN KEY("cohort_id") REFERENCES "Cohorts"("cohort_id") ON DELETE SET NULL
);

-- =====================================================================
-- APPLICATION AND LINKING TABLES
-- =====================================================================
CREATE TABLE "Organization_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "form_id" INT NOT NULL,
    "form_responses" JSONB,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "reviewed_by_admin_id" INT,
    "review_notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "fk_app_form" FOREIGN KEY("form_id") REFERENCES "Forms"("form_id") ON DELETE RESTRICT,
    CONSTRAINT "fk_requesting_user" FOREIGN KEY("requesting_user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_reviewed_by_admin" FOREIGN KEY("reviewed_by_admin_id") REFERENCES "Users"("user_id") ON DELETE SET NULL
);

CREATE TABLE "Individual_Role_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "form_id" INT NOT NULL,
    "form_responses" JSONB,
    "proposed_role" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "reviewed_by_admin_id" INT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "fk_ind_app_form" FOREIGN KEY("form_id") REFERENCES "Forms"("form_id") ON DELETE RESTRICT,
    CONSTRAINT "fk_requesting_user_individual" FOREIGN KEY("requesting_user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_reviewed_by_admin_individual" FOREIGN KEY("reviewed_by_admin_id") REFERENCES "Users"("user_id") ON DELETE SET NULL
);

CREATE TABLE "User_Ecosystem_Roles" (
    "role_assignment_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT "fk_user_role" FOREIGN KEY("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    UNIQUE("user_id", "role")
);

CREATE TABLE "User_Organization_Memberships" (
    "membership_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "organization_id" INT NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "fk_user_membership" FOREIGN KEY("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_organization_membership" FOREIGN KEY("organization_id") REFERENCES "Organizations"("organization_id") ON DELETE CASCADE,
    UNIQUE("user_id", "organization_id")
);

-- =====================================================================
-- INDEXES
-- =====================================================================
-- Standard B-Tree indexes for common search columns
CREATE INDEX "idx_users_country" ON "Users"("country");
CREATE INDEX "idx_users_state_province" ON "Users"("state_province");
CREATE INDEX "idx_users_city" ON "Users"("city");
CREATE INDEX "idx_organizations_country" ON "Organizations"("country");
CREATE INDEX "idx_organizations_state_province" ON "Organizations"("state_province");
CREATE INDEX "idx_organizations_city" ON "Organizations"("city");
CREATE INDEX "idx_organizations_deleted_at" ON "Organizations"("deleted_at");
CREATE INDEX "idx_org_app_req_user" ON "Organization_Applications"("requesting_user_id");
CREATE INDEX "idx_ind_app_req_user" ON "Individual_Role_Applications"("requesting_user_id");
CREATE INDEX "idx_membership_user" ON "User_Organization_Memberships"("user_id");
CREATE INDEX "idx_membership_org" ON "User_Organization_Memberships"("organization_id");

-- GIN indexes for efficient querying within JSONB columns
CREATE INDEX "idx_org_app_responses" ON "Organization_Applications" USING GIN ("form_responses");
CREATE INDEX "idx_ind_app_responses" ON "Individual_Role_Applications" USING GIN ("form_responses");
CREATE INDEX "idx_users_address_details" ON "Users" USING GIN ("address_details");
CREATE INDEX "idx_organizations_address_details" ON "Organizations" USING GIN ("address_details");

-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
