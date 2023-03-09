import styled from 'styled-components'

export const signupContainer = styled.div`
    position: relative;
    z-index: 5;

    h1{

        font-size: 3rem;
        padding: 20px;
        margin: 0 0 5% 0;
        text-align: center;
    }
    a,h2{
        padding-top: 5px;
        text-decoration:none;
   
      
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 60vh;
    }
    .bottom{
        height: 40vh;
    }
    .input{
        padding:0 0 10px 0;
    }
    input{
        background-color: #f0e4dafb;
        filter: drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px);
        color: #9f496e;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    }
    button{
        background-color: #f0e4dafb;
        color: #9f496e;
        border-color: #9f496e;
     
        opacity:0.8;
        :hover{
            opacity:1;
            border-color: #9f496e;
            
        }
    }
    @media(max-width:500px){
        img{
            width:350px;
        }
    }

`