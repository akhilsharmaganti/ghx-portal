import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TabType, User, DashboardStats, Program, CalendarEvent, Mentor } from '@/types';

// Dashboard State Interface
interface DashboardState {
  // Current user
  currentUser: User | null;
  
  // Navigation state
  activeTab: TabType;
  sidebarCollapsed: boolean;
  
  // Data states
  dashboardStats: DashboardStats | null;
  programs: Program[];
  calendarEvents: CalendarEvent[];
  mentors: Mentor[];
  
  // Loading states
  isLoading: {
    dashboard: boolean;
    programs: boolean;
    calendar: boolean;
    mentors: boolean;
    profile: boolean;
  };
  
  // Error states
  errors: {
    dashboard: string | null;
    programs: string | null;
    calendar: string | null;
    mentors: string | null;
    profile: string | null;
  };
}

// Dashboard Actions Interface
interface DashboardActions {
  // User actions
  setCurrentUser: (user: User | null) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  
  // Navigation actions
  setActiveTab: (tab: TabType) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Data actions
  setDashboardStats: (stats: DashboardStats) => void;
  setPrograms: (programs: Program[]) => void;
  addProgram: (program: Program) => void;
  updateProgram: (id: string, updates: Partial<Program>) => void;
  removeProgram: (id: string) => void;
  
  setCalendarEvents: (events: CalendarEvent[]) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  removeCalendarEvent: (id: string) => void;
  
  setMentors: (mentors: Mentor[]) => void;
  addMentor: (mentor: Mentor) => void;
  updateMentor: (id: string, updates: Partial<Mentor>) => void;
  removeMentor: (id: string) => void;
  
  // Loading actions
  setLoading: (key: keyof DashboardState['isLoading'], loading: boolean) => void;
  
  // Error actions
  setError: (key: keyof DashboardState['errors'], error: string | null) => void;
  clearErrors: () => void;
  
  // Reset actions
  resetDashboard: () => void;
}

// Combined State and Actions
type DashboardStore = DashboardState & DashboardActions;

// Initial State
const initialState: DashboardState = {
  currentUser: null,
  activeTab: 'dashboard',
  sidebarCollapsed: false,
  dashboardStats: null,
  programs: [],
  calendarEvents: [],
  mentors: [],
  isLoading: {
    dashboard: false,
    programs: false,
    calendar: false,
    mentors: false,
    profile: false,
  },
  errors: {
    dashboard: null,
    programs: null,
    calendar: null,
    mentors: null,
    profile: null,
  },
};

// Create Store
export const useDashboardStore = create<DashboardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // User actions
        setCurrentUser: (user) => set({ currentUser: user }),
        
        updateUserProfile: (updates) => {
          const { currentUser } = get();
          if (currentUser) {
            set({ currentUser: { ...currentUser, ...updates } });
          }
        },
        
        // Navigation actions
        setActiveTab: (tab) => set({ activeTab: tab }),
        
        toggleSidebar: () => {
          const { sidebarCollapsed } = get();
          set({ sidebarCollapsed: !sidebarCollapsed });
        },
        
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        
        // Data actions
        setDashboardStats: (stats) => set({ dashboardStats: stats }),
        
        setPrograms: (programs) => set({ programs }),
        
        addProgram: (program) => {
          const { programs } = get();
          set({ programs: [...programs, program] });
        },
        
        updateProgram: (id, updates) => {
          const { programs } = get();
          set({
            programs: programs.map(program =>
              program.id === id ? { ...program, ...updates } : program
            ),
          });
        },
        
        removeProgram: (id) => {
          const { programs } = get();
          set({ programs: programs.filter(program => program.id !== id) });
        },
        
        setCalendarEvents: (events) => set({ calendarEvents: events }),
        
        addCalendarEvent: (event) => {
          const { calendarEvents } = get();
          set({ calendarEvents: [...calendarEvents, event] });
        },
        
        updateCalendarEvent: (id, updates) => {
          const { calendarEvents } = get();
          set({
            calendarEvents: calendarEvents.map(event =>
              event.id === id ? { ...event, ...updates } : event
            ),
          });
        },
        
        removeCalendarEvent: (id) => {
          const { calendarEvents } = get();
          set({ calendarEvents: calendarEvents.filter(event => event.id !== id) });
        },
        
        setMentors: (mentors) => set({ mentors }),
        
        addMentor: (mentor) => {
          const { mentors } = get();
          set({ mentors: [...mentors, mentor] });
        },
        
        updateMentor: (id, updates) => {
          const { mentors } = get();
          set({
            mentors: mentors.map(mentor =>
              mentor.id === id ? { ...mentor, ...updates } : mentor
            ),
          });
        },
        
        removeMentor: (id) => {
          const { mentors } = get();
          set({ mentors: mentors.filter(mentor => mentor.id !== id) });
        },
        
        // Loading actions
        setLoading: (key, loading) => {
          const { isLoading } = get();
          set({ isLoading: { ...isLoading, [key]: loading } });
        },
        
        // Error actions
        setError: (key, error) => {
          const { errors } = get();
          set({ errors: { ...errors, [key]: error } });
        },
        
        clearErrors: () => {
          set({ errors: initialState.errors });
        },
        
        // Reset actions
        resetDashboard: () => set(initialState),
      }),
      {
        name: 'ghx-dashboard-store',
        partialize: (state) => ({
          currentUser: state.currentUser,
          activeTab: state.activeTab,
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    ),
    {
      name: 'ghx-dashboard-store',
    }
  )
);

// Selector hooks for better performance
export const useCurrentUser = () => useDashboardStore((state) => state.currentUser);
export const useActiveTab = () => useDashboardStore((state) => state.activeTab);
export const useSidebarCollapsed = () => useDashboardStore((state) => state.sidebarCollapsed);
export const useDashboardStats = () => useDashboardStore((state) => state.dashboardStats);
export const usePrograms = () => useDashboardStore((state) => state.programs);
export const useCalendarEvents = () => useDashboardStore((state) => state.calendarEvents);
export const useMentors = () => useDashboardStore((state) => state.mentors);
export const useLoading = () => useDashboardStore((state) => state.isLoading);
export const useErrors = () => useDashboardStore((state) => state.errors);
