import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          ...colors.slate,
          850: '#172033',
        },
        // Brand Colors
        sky: {
          ...colors.sky,
          50: '#F0F9FF',  // Very light blue for subtle portal backgrounds
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7', // Sky Blue (Primary Buttons & Links)
          600: '#0369A1',
          700: '#075985',
          800: '#0C4A6E',
          900: '#0F172A', // Deep Aerospace Blue (Primary text & Dark backgrounds)
          950: '#082F49',
        },
        // Status & Telemetry Colors (Crucial for Dashboards)
        status: {
          in_transit: '#3B82F6', // Blue
          delivered: '#10B981',  // Emerald Green
          charging: '#F59E0B',   // Amber
          maintenance: '#EF4444',// Red
          success: {
            DEFAULT: '#10B981',
            light: '#ECFDF5',
            dark: '#064E3B',
            text: '#34D399',
          },
          warning: {
            DEFAULT: '#F59E0B',
            light: '#FFFBEB',
            dark: '#78350F',
            text: '#FBBF24',
          },
          error: {
            DEFAULT: '#EF4444',
            light: '#FEF2F2',
            dark: '#7F1D1D',
            text: '#F87171',
          },
          info: {
            DEFAULT: '#0EA5E9',
            light: '#F0F9FF',
            dark: '#0C4A6E',
            text: '#38BDF8',
          }
        },
        // UI Neutrals
        surface: {
          DEFAULT: '#FFFFFF', // Pure white for cards
          elevated: '#1E293B',
          overlay: '#334155',
          muted: '#090D16',
          light: '#F8FAFC',
          'light-elevated': '#FFFFFF',
          'light-muted': '#F1F5F9',
        },
        base: '#F8FAFC',    // Off-white for app backgrounds
        border: {
          DEFAULT: '#E2E8F0', // Subtle borders for tables
          subtle: '#1E293B',
          light: '#E2E8F0',
        },
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          light: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#94A3B8',
          }
        },
      },

      fontFamily: {
        sans: ['Inter', 'Roobert', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.25), 0 2px 6px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'glow-cyan': '0 0 20px -5px rgba(14, 165, 233, 0.3)',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
