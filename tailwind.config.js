/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EmirAfrik Brand Colors (based on website analysis)
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',  // Primary brand color
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',  // Main emerald brand color
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Secondary accent colors
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Medical/Health themed colors
        medical: {
          blue: '#0369a1',
          green: '#059669',
          teal: '#0d9488',
          red: '#dc2626',
          orange: '#ea580c',
          purple: '#9333ea',
        },
        // Loyalty tier colors
        loyalty: {
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          gold: '#ffd700',
          platinum: '#e5e4e2',
          diamond: '#b9f2ff',
        },
        // WhatsApp brand color
        whatsapp: {
          green: '#25d366',
          dark: '#128c7e',
          light: '#dcf8c6',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(5, 150, 105, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(5, 150, 105, 0.8), 0 0 30px rgba(5, 150, 105, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'medical-pattern': 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'emirafrik': '0 4px 14px 0 rgba(5, 150, 105, 0.15)',
        'emirafrik-lg': '0 10px 25px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.1)',
        'glow-emerald': '0 0 20px rgba(5, 150, 105, 0.3)',
        'whatsapp': '0 4px 14px 0 rgba(37, 211, 102, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'emirafrik': '12px',
        'xl-plus': '1.25rem',
        '2xl-plus': '1.75rem',
      }
    },
  },
  plugins: [
    // Custom plugin for EmirAfrik specific utilities
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient-emirafrik': {
          'background': 'linear-gradient(135deg, #059669, #10b981)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-gradient-emirafrik': {
          'background': 'linear-gradient(135deg, #059669, #10b981)',
        },
        '.bg-gradient-emirafrik-reverse': {
          'background': 'linear-gradient(135deg, #10b981, #059669)',
        },
        '.border-gradient-emirafrik': {
          'border': '2px solid',
          'border-image': 'linear-gradient(135deg, #059669, #10b981) 1',
        },
        '.glass-effect': {
          'background': 'rgba(255, 255, 255, 0.15)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.medical-card': {
          'background': '#ffffff',
          'border': '1px solid #e5e7eb',
          'border-radius': '12px',
          'box-shadow': '0 4px 14px 0 rgba(5, 150, 105, 0.08)',
          'transition': 'all 0.3s ease',
        },
        '.medical-card:hover': {
          'box-shadow': '0 10px 25px -3px rgba(5, 150, 105, 0.15)',
          'transform': 'translateY(-2px)',
        }
      })
    }
  ],
}