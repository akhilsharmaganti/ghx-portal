
-- =====================================================================
-- GHX Innovation Exchange Database Schema
-- Version: 1.0
-- Author: Gemini
-- Description: This script creates the complete database structure
-- based on a detailed architectural discussion.
-- =====================================================================

-- Drop tables in reverse order of creation to avoid foreign key conflicts
DROP TABLE IF EXISTS "User_Organization_Memberships";
DROP TABLE IF EXISTS "User_Ecosystem_Roles";
DROP TABLE IF EXISTS "Organization_Applications";
DROP TABLE IF EXISTS "Individual_Role_Applications";
DROP TABLE IF EXISTS "Organizations";
DROP TABLE IF EXISTS "Users";

-- =====================================================================
-- TABLE: Users
-- Stores the core profile for every individual in the ecosystem.
-- =====================================================================
CREATE TABLE "Users" (
    "user_id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(50),
    "profile_picture_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "last_login_at" TIMESTAMPTZ
);

-- =====================================================================
-- TABLE: Organizations
-- Stores approved organizations (Startups, HCPs, Investors, etc.).
-- This table is populated only after an application is approved by a GHX admin.
-- =====================================================================
CREATE TABLE "Organizations" (
    "organization_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "organization_type" VARCHAR(50) NOT NULL, -- e.g., 'STARTUP', 'HCP', 'INVESTOR_FIRM'
    "description" TEXT,
    "website_url" VARCHAR(255),
    "logo_url" VARCHAR(255),
    "is_verified" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- TABLE: Organization_Applications
-- Acts as a staging area for organization creation requests.
-- A GHX admin must approve a record here before it becomes an official organization.
-- =====================================================================
CREATE TABLE "Organization_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "proposed_name" VARCHAR(255) NOT NULL,
    "proposed_type" VARCHAR(50) NOT NULL,
    "application_data" JSONB, -- Flexible field for other form details
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    "reviewed_by_admin_id" INT,
    "review_notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "fk_requesting_user"
        FOREIGN KEY("requesting_user_id")
        REFERENCES "Users"("user_id")
        ON DELETE CASCADE, -- If user deletes account, their application is removed

    CONSTRAINT "fk_reviewed_by_admin"
        FOREIGN KEY("reviewed_by_admin_id")
        REFERENCES "Users"("user_id")
        ON DELETE SET NULL -- If admin account is deleted, keep the record but nullify the reviewer
);

-- =====================================================================
-- TABLE: Individual_Role_Applications
-- Staging area for individuals applying for a special ecosystem role (e.g., Mentor).
-- =====================================================================
CREATE TABLE "Individual_Role_Applications" (
    "application_id" SERIAL PRIMARY KEY,
    "requesting_user_id" INT NOT NULL,
    "proposed_role" VARCHAR(50) NOT NULL, -- e.g., 'MENTOR', 'INDIVIDUAL_INVESTOR'
    "justification" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    "reviewed_by_admin_id" INT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "fk_requesting_user_individual"
        FOREIGN KEY("requesting_user_id")
        REFERENCES "Users"("user_id")
        ON DELETE CASCADE,

    CONSTRAINT "fk_reviewed_by_admin_individual"
        FOREIGN KEY("reviewed_by_admin_id")
        REFERENCES "Users"("user_id")
        ON DELETE SET NULL
);

-- =====================================================================
-- TABLE: User_Ecosystem_Roles
-- Stores approved, non-organizational roles for individuals (e.g., Mentor).
-- =====================================================================
CREATE TABLE "User_Ecosystem_Roles" (
    "role_assignment_id" SERIAL PRIMARY KEY,
    "user_id" INT UNIQUE NOT NULL, -- A user can have one entry here for their special role
    "role" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT "fk_user_role"
        FOREIGN KEY("user_id")
        REFERENCES "Users"("user_id")
        ON DELETE CASCADE -- If user is deleted, their special role is removed
);

-- =====================================================================
-- TABLE: User_Organization_Memberships
-- The crucial linking table that models the many-to-many relationship
-- between Users and Organizations.
-- =====================================================================
CREATE TABLE "User_Organization_Memberships" (
    "membership_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "organization_id" INT NOT NULL,
    "role" VARCHAR(50) NOT NULL, -- e.g., 'ADMIN', 'MEMBER'
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- e.g., 'ACTIVE', 'PENDING_INVITE'

    CONSTRAINT "fk_user_membership"
        FOREIGN KEY("user_id")
        REFERENCES "Users"("user_id")
        ON DELETE CASCADE, -- If user is deleted, their memberships are removed

    CONSTRAINT "fk_organization_membership"
        FOREIGN KEY("organization_id")
        REFERENCES "Organizations"("organization_id")
        ON DELETE CASCADE, -- If organization is deleted, all its memberships are removed

    UNIQUE("user_id", "organization_id") -- A user can only have one role in a given organization
);

-- =====================================================================
-- INDEXES
-- Create indexes on foreign keys and commonly queried columns to improve performance.
-- =====================================================================
CREATE INDEX "idx_org_app_req_user" ON "Organization_Applications"("requesting_user_id");
CREATE INDEX "idx_ind_app_req_user" ON "Individual_Role_Applications"("requesting_user_id");
CREATE INDEX "idx_membership_user" ON "User_Organization_Memberships"("user_id");
CREATE INDEX "idx_membership_org" ON "User_Organization_Memberships"("organization_id");

-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
