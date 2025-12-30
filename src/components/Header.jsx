
const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img 
        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png"
        alt="NetflixGPT"
        className="w-44"
        onError={(e) => {
          e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg';
        }}
      />
    </div>
  )
}

export default Header