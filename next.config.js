module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://fantasy.premierleague.com/api/:path*'
          },
        ]
      },
  };