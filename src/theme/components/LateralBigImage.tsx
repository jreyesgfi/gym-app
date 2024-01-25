import styled from "styled-components";

interface Props {
    left?: boolean;
    src: string;
}


const Image = styled.img<{left?:boolean}>`
    object-fit: cover;
    position: absolute;
    max-width: max(600px, 98vw);
    max-height: 600px;
    width: 50%;
    margin: auto 24px;
    inset: 0 0 0 auto;
    inset: ${({left})=>(left===true?"0 auto 0 0":"0 0 0 auto")}
    
    @media (max-width: 600px) {
        opacity: 0.4;
        width: 100vw;
        max-width: 100vw;
        inset: 0;
      }
    `;
export const LateralBigImage: React.FC<Props> = ({left, src}) => (
	<Image
        left={left}
        src={src}
    />
  )