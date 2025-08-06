## USER LIFECYCLE AND ROLE MANAGEMENT FLOW

Any random person can register on our platform. Once registered, they will be assigned a default "guest" role and granted access to a very basic dashboard with limited visibility — they can only browse publicly available programs or content.

If the user does not enroll in any program and remains inactive for **X** number of days (defined by the platform admin), they will receive a warning email sent to their registered email ID. This warning informs them that their account is at risk of deactivation. If the user does not log in or engage with the platform within **7 days** of receiving this warning, the user account will be **soft-deleted** (not permanently removed but deactivated). Platform admins may optionally choose to permanently delete soft-deleted accounts after a retention period (for example 60–90 days).

---

There are multiple user roles on the platform, such as Startup, Investor, Mentor, CRO, Hospital, and other types of organizations. These roles are categorized into two types:

### Category 1: Single user role
These are roles that apply to an individual person. Examples: mentor, investor, CRO.

For Category 1 roles:
A. A registered user can submit a request to the platform admin to be granted a specific role.
   - The request is reviewed by the admin.
   - The admin may approve or reject based on internal criteria.
   - Upon approval, the user’s role is updated and appropriate dashboard access is granted.
   - The user is notified of the decision.

OR

B. The platform admin can create a user account manually (or pre-register someone) and assign a specific role directly.
   - The newly created user will receive an email prompting them to reset their password.
   - After password setup, the user can log in with the pre-assigned role.

In both A and B cases, **the final authority to assign or reject any role lies solely with the platform admin.**

---

### Category 2: Multiple users being members of a single role
These are organization-type roles where many users belong to a single group. Examples: Startup (with multiple employees), Hospitals, Incubators.

For Category 2 roles:

A.
1. A registered user can request the platform admin to create an organization (e.g. a startup, hospital) and assign them as the **organization-admin**.  
2. Once the organization is created and the user is assigned org-admin rights, that org-admin can submit requests to the platform admin to:
   - Add specific users to their organization.
   - Assign those users to particular internal roles (e.g. researcher, associate, analyst etc. depending on the org type).
   - The admin has the discretion to accept or reject these assignments.
   - The organization-admin can also provide a **bulk list of users** to the platform admin for addition to the organization. This list will be reviewed and processed accordingly.


OR

B. The platform admin may directly create a new organization and bulk assign multiple users to various roles within it.
   - These users will receive emails to reset their passwords (if newly created).
   - They will then gain access to their respective dashboards after password setup.

A mix of A and B can happen at any point — for example, the platform admin may create the organization structure, and the org-admin may later request modifications or add new members over time.

---

A registered user (regardless of role) can also apply to enroll in one or more programs offered by the platform. These programs may include mentorships, accelerators, investments, medical trials, and others as defined by the admin.

- Enrollment into any program is **not automatic**.
- The user submits an application for enrollment.
- The platform admin reviews the application.
- The admin has the full right to approve or reject the enrollment at any stage.
- The admin can also revoke enrollment or remove a user from a program at any time, based on internal policies or violations.

---

## NOTIFICATIONS AND PROGRAM ENROLLMENT FLOW

The platform supports a robust notification system which allows the admin to push notifications to registered users regarding upcoming programs or opportunities.

For example, the admin may send a notification stating:
**"We have launched a new program. Do you want to enroll?"**

All users (or selected user segments) will receive this notification in two ways:
1. As an in-app notification (on their dashboard).
2. As an email notification (if opted in).

Once the user receives the notification, they have two choices:
- They can **click to apply** to the program.
- Or they can **ignore** or leave it unattended.

The system is designed to **send repeated reminder notifications** for such program invitations if the user does not take any action. These reminders are sent every **X days** (where X is configurable by the admin). The default frequency can be set globally, or overridden per program.

The repeated notifications will continue until:
- The user either applies, or
- The notification expires (program closes or deadline is reached).

---

Once a user **clicks 'Apply'**, the following events are triggered:
1. A new application entry is created and marked as “Pending”.
2. The **platform admin receives a notification** that the user has applied for the program.
3. The admin can review the application and either **approve** or **reject** it.

If the admin **accepts** the user’s application:
- The user is marked as officially **enrolled** in the program.
- The program is automatically **added to the user's calendar**, along with:
  - Start date
  - Duration or milestones (if applicable)
  - Any scheduled meetings or deadlines tied to the program
- The user also receives a **confirmation notification** and email.

If the admin **rejects** the application:
- The user is notified with a message stating the rejection.
- The user’s dashboard reflects the rejection status.
- No further reminders for that program are sent to the user.

---

## MEETING SCHEDULING AND CALENDAR SYNC FLOW

The platform allows the **admin to schedule meetings** with any set of users — these may be:
- Individual users (mentors, investors, startups, etc.), or
- Entire organizations (such as all members of a particular startup or hospital).

The admin has access to a **meeting scheduler tool** from the admin dashboard. This tool enables the admin to:
- Set the meeting title, date, time, duration, and description.
- Choose whether the meeting is **online** (with a link) or **offline** (with a physical location).
- Select participants from the user base — this can be done by:
  - Selecting individual users one by one.
  - Selecting all members of an organization.
  - Selecting a role group (e.g., all mentors).

Once the meeting is scheduled:
1. All selected users receive an **in-app notification** and an **email invite** that includes:
   - Meeting name
   - Date and time
   - Location or video link
   - Agenda or notes (if any)
2. The meeting is **automatically added to each participant’s calendar** on the platform.
   - The calendar entry includes a “Join” or “View” button.
   - Calendar reminders are sent as the meeting time approaches (default: 24 hours and 1 hour before).
3. The meeting status in the calendar is initially marked as **"Scheduled"**.

---

If a **meeting is rescheduled**:
- All participants are notified of the new time via in-app and email.
- Their calendars are updated automatically.
- Prior reminder triggers are reset according to the new time.

If a **meeting is cancelled**:
- A cancellation notice is sent.
- The meeting entry is marked “Cancelled” or removed from the calendar.
- Users are notified accordingly.

---

### System-Side Notes:
- Meetings are tracked as entities in a `meetings` table, with links to users and/or organizations.
- A many-to-many relationship links meetings ↔ users.
- Notification logs track when users received, opened, or responded to the meeting.
- Calendar module supports different types of entries (Programs, Meetings, Events, Deadlines), and color-codes them for clarity.

