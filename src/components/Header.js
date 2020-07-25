import React from 'react';

function Header() {
return (
    <div>
            <img src={require('../assets/logo.png')} style={logoStyle} alt={'Logo'}/>
            <header className='header' style={headerStyle}>
            RG Weather Forecast
        </header>
</div>
   
  );
}

const headerStyle ={

    backgroundColor: '#246D3F',
    color:'#fff',
    opacity: 0.75,
    textAlign: 'center',
    height: '75px',
    fontSize: '40px',
    paddingTop: '10px'
    
}

const logoStyle = {

    //width: '100%',
    height: '85px',
    position: 'absolute',
    top: '0px',
    left: '80px',
    margin: '0',
    zIndex:'1',
    color: '#fff',
    backgroundColor: '#fff'
}
export default Header;
