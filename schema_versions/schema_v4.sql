
-- =====================================================================
-- GHX Innovation Exchange Database Schema
-- Version: 4.0 (Final)
-- Author: Gemini
-- Description: This script creates the complete database structure.
-- v4.0 introduces a "soft delete" pattern for Organizations to preserve
-- historical data, which is a critical business requirement.
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
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "last_login_at" TIMESTAMPTZ
);

-- =====================================================================
-- TABLE: Organizations
-- Implements a "soft delete" pattern using the `deleted_at` column.
-- =====================================================================
CREATE TABLE "Organizations" (
    "organization_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "organization_type" VARCHAR(50) NOT NULL, -- e.g., 'STARTUP', 'HCP', 'INVESTOR_FIRM'
    "description" TEXT,
    "website_url" VARCHAR(255),
    "logo_url" VARCHAR(255),
    "is_verified" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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

    UNIQUE("name", "version")
);

-- =====================================================================
-- TABLES for Cohort Tracking
-- =====================================================================
CREATE TABLE "Cohorts" (
    "cohort_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'Fall 2025 Accelerator'
    "start_date" DATE,
    "end_date" DATE
);

CREATE TABLE "Startup_Details" (
    "organization_id" INT PRIMARY KEY, -- One-to-one relationship with Organizations
    "cohort_id" INT,
    "alumni_status" VARCHAR(50) DEFAULT 'ACTIVE_MEMBER', -- e.g., 'ACTIVE_MEMBER', 'ALUMNI'

    CONSTRAINT "fk_startup_organization"
        FOREIGN KEY("organization_id")
        REFERENCES "Organizations"("organization_id")
        ON DELETE CASCADE, -- If an org is hard-deleted (rare), its details are removed.

    CONSTRAINT "fk_startup_cohort"
        FOREIGN KEY("cohort_id")
        REFERENCES "Cohorts"("cohort_id")
        ON DELETE SET NULL
);

-- =====================================================================
-- APPLICATION AND LINKING TABLES
-- =====================================================================
CREATE TABLE "Organization_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "form_id" INT NOT NULL,
    "form_responses" JSONB, -- Stores the user's answers to the form as a JSON document
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
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

    CONSTRAINT "fk_user_role"
        FOREIGN KEY("user_id")
        REFERENCES "Users"("user_id")
        ON DELETE CASCADE,

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
CREATE INDEX "idx_org_app_req_user" ON "Organization_Applications" ("requesting_user_id");
CREATE INDEX "idx_ind_app_req_user" ON "Individual_Role_Applications" ("requesting_user_id");
CREATE INDEX "idx_membership_user" ON "User_Organization_Memberships" ("user_id");
CREATE INDEX "idx_membership_org" ON "User_Organization_Memberships" ("organization_id");
CREATE INDEX "idx_organizations_deleted_at" ON "Organizations" ("deleted_at"); -- Index for soft deletes

-- Create GIN indexes on JSONB columns for efficient querying within the JSON structure.
CREATE INDEX "idx_org_app_responses" ON "Organization_Applications" USING GIN ("form_responses");
CREATE INDEX "idx_ind_app_responses" ON "Individual_Role_Applications" USING GIN ("form_responses");

-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
