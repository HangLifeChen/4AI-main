import './index.scss';

export const StarBorder = ({
  className = '',
  color = 'white',
  speed = '4s',
  children,
  ...rest
}) => {
  return (
    <div className={`star-border-container ${className}`} {...rest}>
      <div
        className='border-gradient border-gradient-bottom'
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className='border-gradient border-gradient-top'
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className='inner-content'>{children}</div>
    </div>
  );
};

export default StarBorder;
