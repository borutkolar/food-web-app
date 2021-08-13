import "./style.scss";

function Loading(): JSX.Element {
  return (
    <div data-testid="loading" className="loading-overlay">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
