import styled from "styled-components";

export const Wrapper = styled.div`
display:flex;
justify-content: space-between;
flex-direction: column;
width: 100%;
border-radius: 20px;
border:1px solid lightblue;
height: 100%;
button{
    border-radius: 0 0 20px 20px;
}
img{
    height:250px ;
    object-fit: contain;
    border-radius: 20px 20px 0 0;
}
div{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding:1rem;
    height: 100%;
}
`