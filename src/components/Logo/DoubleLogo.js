import classnames from 'classnames';
import Logo from 'components/Logo/Logo';

export default function DoubleLogo({ src0, src1, alt0, alt1, className, isLpToken = true, size = 20 }) {
  return (
    <div className={classnames('relative', className)}>
      {src0 && (
        <Logo src={src0} alt={alt0} size={size} className={classnames(isLpToken ? 'relative z-20' : 'inline-block')} />
      )}
      {src1 && (
        <Logo
          src={src1}
          alt={alt1}
          size={size}
          className={classnames(isLpToken ? 'absolute top-0 -right-10' : 'inline-block')}
        />
      )}
    </div>
  );
}
