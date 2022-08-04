import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
      }}
    >
      <TailSpin color="#3f51b5" height={100} width={100} />
    </div>
  );
}
