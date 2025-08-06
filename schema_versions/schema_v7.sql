
-- =====================================================================
-- GHX Innovation Exchange Database Schema
-- Version: 7.0 (Final, Production Ready)
-- Author: Gemini
-- Description: This script creates the complete database structure.
-- v7.0 implements a robust lookup table for roles, providing database-level
-- integrity and application-level agility. Also adds comprehensive
-- `deleted_at` and `updated_at` fields for auditability.
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
DROP TABLE IF EXISTS "Roles";

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
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    "last_login_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ NULL -- For soft deletes
);

-- =====================================================================
-- TABLE: Organizations
-- Implements a "soft delete" pattern using the `deleted_at` column.
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
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    "deleted_at" TIMESTAMPTZ NULL -- For soft deletes. If NULL, the org is active. If NOT NULL, it's considered deleted.
);

-- =====================================================================
-- TABLE: Forms (JSON-based approach)
-- =====================================================================
CREATE TABLE "Forms" (
    "form_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "version" INT NOT NULL DEFAULT 1,
    "description" TEXT,
    "structure" JSONB NOT NULL, -- Stores the entire form layout, fields, and rules as a JSON document
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    "deleted_at" TIMESTAMPTZ NULL, -- For soft deletes
    UNIQUE("name", "version")
);

-- =====================================================================
-- TABLES for Cohort Tracking
-- =====================================================================
CREATE TABLE "Cohorts" (
    "cohort_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW() -- Added for auditability
);

CREATE TABLE "Startup_Details" (
    "organization_id" INT PRIMARY KEY,
    "cohort_id" INT,
    "alumni_status" VARCHAR(50) DEFAULT 'ACTIVE_MEMBER',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    CONSTRAINT "fk_startup_organization" FOREIGN KEY("organization_id") REFERENCES "Organizations"("organization_id") ON DELETE CASCADE,
    CONSTRAINT "fk_startup_cohort" FOREIGN KEY("cohort_id") REFERENCES "Cohorts"("cohort_id") ON DELETE SET NULL
);

-- =====================================================================
-- NEW TABLE: Roles (Lookup Table)
-- =====================================================================
CREATE TABLE "Roles" (
    "role_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'MENTOR', 'ADMIN', 'MEMBER', 'INNOVATOR', 'INVESTOR'
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- APPLICATION AND LINKING TABLES (Updated to use role_id)
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
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    "deleted_at" TIMESTAMPTZ NULL, -- For soft deletes
    CONSTRAINT "fk_app_form" FOREIGN KEY("form_id") REFERENCES "Forms"("form_id") ON DELETE RESTRICT,
    CONSTRAINT "fk_requesting_user" FOREIGN KEY("requesting_user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_reviewed_by_admin" FOREIGN KEY("reviewed_by_admin_id") REFERENCES "Users"("user_id") ON DELETE SET NULL
);

CREATE TABLE "Individual_Role_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "form_id" INT NOT NULL,
    "form_responses" JSONB,
    "proposed_role_id" INT NOT NULL, -- Now uses FK to Roles table
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "reviewed_by_admin_id" INT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    "deleted_at" TIMESTAMPTZ NULL, -- For soft deletes
    CONSTRAINT "fk_ind_app_form" FOREIGN KEY("form_id") REFERENCES "Forms"("form_id") ON DELETE RESTRICT,
    CONSTRAINT "fk_requesting_user_individual" FOREIGN KEY("requesting_user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_reviewed_by_admin_individual" FOREIGN KEY("reviewed_by_admin_id") REFERENCES "Users"("user_id") ON DELETE SET NULL,
    CONSTRAINT "fk_proposed_role" FOREIGN KEY("proposed_role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT -- Don't delete a role if it's part of an application
);

CREATE TABLE "User_Ecosystem_Roles" (
    "role_assignment_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "role_id" INT NOT NULL, -- Now uses FK to Roles table
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    CONSTRAINT "fk_user_role" FOREIGN KEY("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_ecosystem_role" FOREIGN KEY("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT, -- Don't delete a role if it's assigned to a user
    UNIQUE("user_id", "role_id")
);

CREATE TABLE "User_Organization_Memberships" (
    "membership_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "organization_id" INT NOT NULL,
    "role_id" INT NOT NULL, -- Now uses FK to Roles table
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Added for auditability
    CONSTRAINT "fk_user_membership" FOREIGN KEY("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE,
    CONSTRAINT "fk_organization_membership" FOREIGN KEY("organization_id") REFERENCES "Organizations"("organization_id") ON DELETE CASCADE,
    CONSTRAINT "fk_membership_role" FOREIGN KEY("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT, -- Don't delete a role if it's part of a membership
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
CREATE INDEX "idx_user_ecosystem_role_user" ON "User_Ecosystem_Roles"("user_id");
CREATE INDEX "idx_user_ecosystem_role_role" ON "User_Ecosystem_Roles"("role_id");
CREATE INDEX "idx_membership_role" ON "User_Organization_Memberships"("role_id");
CREATE INDEX "idx_individual_app_role" ON "Individual_Role_Applications"("proposed_role_id");

-- GIN indexes for efficient querying within JSONB columns
CREATE INDEX "idx_org_app_responses" ON "Organization_Applications" USING GIN ("form_responses");
CREATE INDEX "idx_ind_app_responses" ON "Individual_Role_Applications" USING GIN ("form_responses");
CREATE INDEX "idx_users_address_details" ON "Users" USING GIN ("address_details");
CREATE INDEX "idx_organizations_address_details" ON "Organizations" USING GIN ("address_details");

-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
