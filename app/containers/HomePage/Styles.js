import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Container = styled.div`
  max-width: 1100px;
  display: block;
  margin: 0 auto;
`;

export const ShowDesktop = styled.div`
  display: contents;
  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

export const ShowMobile = styled.div`
  display: none;
  @media only screen and (max-width: 991px) {
    display: contents;
  }
`;

export const MobileIllustration = styled.img`
  max-width: 500px;
  margin: 0 auto;
  display: block;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 70px;
  @media only screen and (max-width: 1165px) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 991px) {
    margin-bottom: 30px;
  }
`;

export const Hero = styled.div`
  background: linear-gradient(150deg, #092131 15%, #286188 43%, #092131 94%);
  background-size: cover;
  padding-top: 25px;
  padding-bottom: 160px;
  position: relative;
  z-index: 1;
  margin-bottom: 175px;
  @media only screen and (max-width: 991px) {
    padding-bottom: 10px;
    margin-bottom: 75px;
  }
  @media only screen and (min-width: 1940px) {
    padding-bottom: 240px;
  }
  h1 {
    color: white;
    font-size: 27px;
    font-weight: 600;
    line-height: 33px;
    @media only screen and (max-width: 1030px) {
      font-size: 25px;
    }
  }

  p {
    margin-top: 20px;
    color: #eeeeee;
    line-height: 24px;
  }
`;

export const HeroIllustration = styled.img`
  position: relative;
  z-index: 100;
  border-radius: 8px;
  -webkit-box-shadow: 1px 1px 5px 0 rgba(26, 26, 67, 0.05),
    39px 62.5px 125px -25px rgba(50, 50, 93, 0.5), 23.4px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  box-shadow: 1px 1px 5px 0 rgba(26, 26, 67, 0.05), 39px 62.5px 125px -25px rgba(50, 50, 93, 0.5),
    23.4px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  -webkit-transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(-29deg)
    rotateX(4deg) rotate(1deg);
  transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(-29deg)
    rotateX(4deg) rotate(1deg);
  @media only screen and (max-width: 1300px) {
    max-width: 90%;
  }
  @media only screen and (max-width: 1120px) {
    max-width: 85%;
  }
`;

export const SignupTitle = styled.p`
  margin-top: 40px !important;
  margin-bottom: 5px !important;
  font-size: 13px;
`;

export const EmailContainer = styled.div`
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
`;

export const SingupAlerts = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: 13px;
  height: 20px;
  p {
    color: #eeeeee;
    display: inline;
    a {
      color: red;
    }
  }
`;

export const AlertIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  margin-right: 10px;
  vertical-align: middle;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-shadow: none;
  border: none;
  outline: none !important;
  border-radius: 4px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  height: 42px;
`;

export const HeroDecoration = styled.div`
  background: #eff3f5;
  height: 400px;
  width: 100%;
  margin-top: -10px;
  transform: skewY(-10deg);
  position: absolute;
  z-index: 5;
  @media only screen and (max-width: 991px) {
    display: none;
  }
  @media only screen and (min-width: 1940px) {
    height: 500px;
  }
`;

export const Exchanges = styled.div`
  margin-top: -160px;
  text-align: center;
  @media only screen and (min-width: 1940px) {
    margin-top: -210px;
  }
  @media only screen and (max-width: 991px) {
    margin-top: 0px;
  }
`;

export const HigherComponent = styled.div`
  position: relative;
  z-index: 100;
`;

export const NotSupported = styled.div`
  opacity: 0.4;
  @media only screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const ExchangeLogo = styled.img`
  max-width: 150px;
  display: block;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Support = styled.p`
  text-transform: uppercase;
  margin-top: 30px;
  font-weight: 600;
  color: #8898aa;
  font-size: 14px;
  letter-spacing: 1px;
`;

export const ToolsGroup1 = styled.div`
  padding-top: 120px;
  padding-bottom: 100px;
  @media only screen and (max-width: 768px) {
    padding-top: 60px;
  }
`;

export const ToolsGroup2 = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  @media only screen and (max-width: 991px) {
    padding-top: 0px;
    padding-bottom: 120px;
  }
`;

export const Tools1 = styled.div`
  width: 270px;
  img {
    width: 270px;
    border-radius: 8px;
    transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(10deg)
      rotateX(10deg) rotate(0deg);
  }
`;

export const Tools2 = styled.div`
  width: 270px;
  margin-top: -130px;
  margin-left: 150px;
  z-index: 10;
  position: relative;
  img {
    width: 270px;
    border-radius: 8px;
    transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(-10deg)
      rotateX(6deg) rotate(0deg);
  }
`;

export const Tools3 = styled.div`
  width: 270px;
  margin-top: -40px;
  margin-left: 50px;
  z-index: 1;
  position: relative;
  img {
    width: 270px;
    border-radius: 8px;
    transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(0deg)
      rotateX(12deg) rotate(0deg);
  }
`;

export const Tools4 = styled.div`
  margin-top: 30px;
  width: 100%;
  z-index: 1;
  position: relative;
  img {
    width: 100%;
    border-radius: 8px;
    transform: scale(1.1) translateX(50px) translateY(0) perspective(3190px) rotateY(-15deg)
      rotateX(9deg) rotate(1deg);
    @media only screen and (max-width: 1300px) {
      width: 90%;
    }
    @media only screen and (max-width: 1200px) {
      width: 80%;
    }
  }
`;

export const FeaturePreTitle = styled.p`
  color: #3cbc98;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
`;

export const FeatureTitle = styled.h2`
  color: #092131;
  font-size: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 35px;
  margin-bottom: 15px;
`;

export const FeatureDescription = styled.p`
  margin-top: 20px;
  opacity: 0.8;
  line-height: 24px;
`;

export const Box = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: rgba(12, 52, 75, 0.05) 0px 3px 3px;
  padding: 45px;
  padding-bottom: 0px;
  z-index: 100;
  position: relative;
`;

export const OtherFeature = styled.div`
  margin-bottom: 60px;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 32px;
  margin-bottom: 15px;
  color: #3cbc98;
`;

export const FeatureTitleSmall = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 6px;
  color: #092131;
`;

export const FeatureDescSmall = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;

export const BottomCta = styled.div`
  padding-top: 350px;
  padding-bottom: 160px;
  margin-top: -210px;
  background: linear-gradient(150deg, #092131 15%, #264f6b 43%, #092131 94%);
  text-align: center;
`;

export const BottomCtaSkew = styled.div`
  background: #eff3f5;
  height: 400px;
  width: 100%;
  margin-top: -560px;
  transform: skewY(-10deg);
  position: absolute;
  z-index: 5;
  @media only screen and (min-width: 2100px) {
    height: 600px;
    width: 100%;
    margin-top: -710px;
  }
`;

export const BottomCtaContainer = styled.div`
  text-align: center;
  color: white;
  margin-top: 50px;
  h1 {
    color: white;
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
    margin-bottom: 20px;
  }
  p {
    color: #eeeeee;
    margin-bottom: 0px;
    line-height: 24px;
  }
`;

export const Soon = styled.span`
  background: #3cbc98;
  color: white;
  font-weight: 600;
  margin-top: -5px;
  font-size: 11px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 2px;
  text-transform: uppercase;
`;
