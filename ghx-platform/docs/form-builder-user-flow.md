# Form Builder User Flow Documentation

## Overview
This document outlines the user flow for the Form Builder phase of the GHX Innovation Exchange platform. The Form Builder is a Single Page Application (SPA) that allows platform administrators to create, edit, and manage dynamic forms for user role applications.

## Phase Implementation: Form Builder SPA

### 1. Admin Access to Form Builder

**Entry Point**: `/admin/form-builder`

**Flow**:
1. Admin navigates to the admin dashboard (`/admin`)
2. Admin clicks on the "Form Builder" card
3. Admin is redirected to the Form Builder SPA

**Technical Implementation**:
- Admin dashboard page (`/admin/page.tsx`) contains a card with link to `/admin/form-builder`
- Form Builder page (`/admin/form-builder/page.tsx`) renders the main FormBuilder component

### 2. Form Builder Interface

**Main Components**:
- **Component Palette**: Left sidebar with draggable form elements
- **Canvas**: Main area where form components are dropped and arranged
- **Toolbar**: Top bar with form settings and actions
- **Preview Mode**: Toggle to see how the form appears to users

**Available Form Components**:
- Text Field (single line input)
- Text Area (multi-line input)
- Email Field
- Phone Number Field
- Date Picker
- Dropdown/Select
- Checkbox
- Radio Buttons
- File Upload
- Number Field
- URL Field
- Password Field

### 3. Form Creation Workflow

#### Option A: Create New Form from Scratch
1. **Start Building**:
   - Admin clicks "Create New Form" button
   - Form Builder opens in create mode
   - Empty canvas is displayed

2. **Add Components**:
   - Admin drags components from palette to canvas
   - Components are automatically added to form schema
   - Admin can select components to edit properties

3. **Configure Components**:
   - Edit component labels, placeholders, validation rules
   - Set required/optional status
   - Configure styling and layout options

4. **Form Settings**:
   - Set form name and description
   - Choose form category
   - Configure submission settings

#### Option B: Use Existing Template
1. **Template Selection**:
   - Admin clicks "Use Template" button
   - Template modal opens with predefined forms
   - Available templates:
     - Basic Startup Application
     - Investor Profile
     - Mentor Application
     - CRO Registration
     - Hospital Partnership

2. **Template Customization**:
   - Selected template loads into canvas
   - Admin can modify, add, or remove components
   - All template components are editable

### 4. Form Management

#### Save Form
- Admin clicks "Save Form" button
- Form schema is stored in database
- Form becomes available for use

#### Edit Existing Form
- Admin selects form from saved forms list
- Form loads into builder in edit mode
- All components and settings are editable
- Changes are saved when "Save Form" is clicked

#### Delete Form
- Admin selects form from saved forms list
- Admin clicks "Delete" button
- Confirmation dialog appears
- Form is permanently removed from database

### 5. Form Delivery System

#### Send Form to User
1. **Select Form**:
   - Admin chooses form from saved forms list
   - Admin clicks "Send Form" button

2. **User Selection**:
   - Admin selects target user(s) from user list
   - Admin can send to individual users or user groups

3. **Form Delivery**:
   - Form is sent to selected user(s)
   - User receives notification about new form
   - Form becomes available in user's dashboard

### 6. User Form Interaction

#### Receive Form
1. **Notification**:
   - User receives notification about new form
   - Form appears in user's dashboard

2. **Access Form**:
   - User clicks on form notification
   - Form opens in user interface
   - Form is rendered using FormComponent

#### Fill Form
1. **Form Rendering**:
   - Form components are rendered based on schema
   - Each component type has appropriate input validation
   - Real-time validation feedback

2. **Data Entry**:
   - User fills in required and optional fields
   - File uploads are handled securely
   - Form validates input as user types

3. **Submit Form**:
   - User clicks "Submit" button
   - Form data is validated
   - Submission is stored in database
   - Admin receives notification of new submission

### 7. Admin Review Process

#### Review Submissions
1. **View Submissions**:
   - Admin accesses submissions dashboard
   - List of all form submissions is displayed
   - Submissions are organized by form and date

2. **Review Individual Submission**:
   - Admin clicks on submission to view details
   - Form responses are displayed in readable format
   - Admin can approve, reject, or request changes

3. **Take Action**:
   - **Approve**: User role application is approved
   - **Reject**: User receives rejection notification
   - **Request Changes**: User receives feedback for resubmission

## Technical Architecture

### Component Structure
```
FormBuilder/
├── FormBuilder.tsx (Main orchestrator)
├── ComponentPalette.tsx (Drag source)
├── DragDropCanvas.tsx (Drop target)
├── FormComponent.tsx (Form renderer)
└── index.ts (Exports)
```

### Data Flow
1. **Form Schema**: JSON structure defining form components and settings
2. **Component Types**: TypeScript interfaces for all form component types
3. **State Management**: React state for form builder and preview modes
4. **Database Integration**: Prisma schema for storing forms and responses

### Key Features
- **Drag & Drop**: HTML5 drag and drop API for component placement
- **Real-time Preview**: Live preview of form as it's being built
- **Template System**: Pre-built form templates for common use cases
- **Validation**: Client-side validation with customizable rules
- **Responsive Design**: Tailwind CSS for mobile-friendly interface
- **TypeScript**: Full type safety throughout the application

## Database Schema

### Forms Table
- `id`: Unique form identifier
- `name`: Form display name
- `description`: Form description
- `schema`: JSON structure of form components
- `category`: Form category
- `version`: Form version number
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

### Form Responses Table
- `id`: Unique response identifier
- `form_id`: Reference to form
- `user_id`: Reference to user who submitted
- `responses`: JSON structure of form responses
- `status`: Submission status (pending, approved, rejected)
- `submitted_at`: Submission timestamp
- `reviewed_at`: Review timestamp

## SOLID Principles Implementation

### Single Responsibility Principle
- Each component has a single, well-defined responsibility
- FormBuilder orchestrates, ComponentPalette displays, DragDropCanvas handles drops

### Open/Closed Principle
- Form component types are extensible without modifying existing code
- New component types can be added by extending the FormComponentType union

### Liskov Substitution Principle
- All form components implement the same base interface
- Components can be substituted without breaking functionality

### Interface Segregation Principle
- Separate interfaces for different component types
- Components only implement interfaces they need

### Dependency Inversion Principle
- High-level modules depend on abstractions
- Form builder depends on component interfaces, not concrete implementations

## Tailwind CSS Reusability

### Component Styles
- Centralized styling configuration in `form-builder-config.ts`
- Consistent design tokens across all components
- Responsive design patterns

### Utility Classes
- Reusable utility classes for common patterns
- Consistent spacing, colors, and typography
- Mobile-first responsive design

## Future Enhancements

### Planned Features
1. **Advanced Validation**: Server-side validation rules
2. **Conditional Logic**: Show/hide fields based on other field values
3. **Form Analytics**: Track form completion rates and user behavior
4. **Bulk Operations**: Send forms to multiple users simultaneously
5. **Form Versioning**: Track changes and rollback capabilities
6. **Integration**: Connect with external systems and APIs

### Technical Improvements
1. **Performance**: Optimize large form rendering
2. **Accessibility**: Improve keyboard navigation and screen reader support
3. **Testing**: Add comprehensive unit and integration tests
4. **Documentation**: API documentation for form builder components
5. **Internationalization**: Multi-language support for form labels and messages

## Conclusion

The Form Builder phase provides a solid foundation for dynamic form creation and management. The implementation follows SOLID principles, uses TypeScript for type safety, and leverages Tailwind CSS for consistent, reusable styling. The system is designed to be extensible and maintainable, allowing for future enhancements while maintaining backward compatibility. 