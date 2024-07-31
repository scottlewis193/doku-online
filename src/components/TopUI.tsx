function TopUI() {
  return (
    <top>
      <img src="static/rileyartcrop.webp" />
      <div className="stats">
        <div className="stat-container" id="">
          <div>&nbsp;</div>
          <input type="button" class="game-btn" id="exit-button" value="E" />
        </div>
        <div className="stat-container" id="current-score">
          <div id="stat-title">Score</div>
          <div id="stat-value">2</div>
        </div>
        <div className="stat-container" id="current-combo">
          <div id="stat-title">Combo</div>
          <div id="stat-value">0</div>
        </div>
        <div className="stat-container" id="high-score">
          <div id="stat-title">High Score</div>
          <div id="stat-value">0</div>
        </div>
        <div className="stat-container" id="">
          <div>&nbsp;</div>
          <input
            type="button"
            class="game-btn"
            id="settings-button"
            value="S"
          />
        </div>
      </div>
    </top>
  );
}

export default TopUI;
