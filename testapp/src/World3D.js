import Spline from '@splinetool/react-spline';

export default function World3D(props) {
  return (
      <Spline
        scene="https://prod.spline.design/46KZRr-qTuMAJQWE/scene.splinecode" 
        onSplineMouseDown={props.onMouseDown}
      />

  );
}
