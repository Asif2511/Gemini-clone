module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,vue}', // Adjust based on your project structure
  ],
  theme: {
    extend: {
      backgroundImage: {
        customgradient: 'linear-gradient(16deg, #4b90ff, #ff5546)',
      },
      colors: {
        SideNavColor: '#f0f4f9',
        NewChatbg: '#e6eaf1',
        ReceentText: '#282828',
        Recenthover: '#e2e6eb',
        Navtext: '#585858',
        GreetText: '#c4c7c5',
        Cardbg: '#f0f4f9',
      },
      spacing: {
        '12.5': '50px',
        '30': '120px',
      },
      animation: {
        loader: 'loader 3s infinite linear',
        fadeIn: 'fadeIn 1.5s ease-in-out', // Added fadeIn animation
      },
      keyframes: {
        loader: {
          '0%': { 'background-position': '-800px 0px' },
          '100%': { 'background-position': '800px 0px' },
        },
        fadeIn: { // Added fadeIn keyframes
          '0%': { 'opacity': '0' },
          '100%': { 'opacity': '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
};
