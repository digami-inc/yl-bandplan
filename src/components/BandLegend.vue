<template>
  <div class="band-legend" role="note" aria-label="Joslu krāsu leģenda">
    <div class="band-legend__items">
      <span class="band-legend__item">
        <span class="band-legend__swatch yellow"></span>
        <strong>CW</strong>
        <span>telegrāfija</span>
      </span>
      <span class="band-legend__item">
        <span class="band-legend__swatch orange"></span>
        <strong>DIGI / MGM</strong>
        <span>digitālie režīmi</span>
      </span>
      <span class="band-legend__item">
        <span class="band-legend__swatch blue"></span>
        <strong>ALL / SSB</strong>
        <span>visi režīmi / SSB</span>
      </span>
      <span class="band-legend__item">
        <span class="band-legend__swatch green"></span>
        <strong>FM / REP</strong>
        <span>FM, digitālā balss, retranslatori</span>
      </span>
      <span class="band-legend__item">
        <span class="band-legend__swatch red"></span>
        <strong>SAT / BEACON</strong>
        <span>satelīti, bākas, aizsargjoslas</span>
      </span>
      <span class="band-legend__item">
        <span class="band-legend__swatch grey"></span>
        <strong>Nav atļauts</strong>
        <span>izvēlētajai kategorijai</span>
      </span>
    </div>
    <div class="band-legend__note">
      Krāsas rāda IARU Region 1 ieteicamo lietojumu; juridisko atļauju nosaka MK noteikumi Nr. 257.
    </div>
  </div>
</template>

<style scoped>
.band-legend {
  box-sizing: border-box;
  margin: 0 0 16px;
  padding: 8px 10px;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 13px;
  line-height: 1.35;
}

.band-legend__items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  align-items: center;
}

.band-legend__item {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  white-space: nowrap;
}

.band-legend__item strong {
  font-weight: 600;
}

.band-legend__swatch {
  display: inline-block;
  width: 16px;
  height: 10px;
  border: 1px solid rgba(0, 0, 0, 0.28);
  box-sizing: border-box;
}

.band-legend__swatch.yellow { background: #fff9c4; }
.band-legend__swatch.orange { background: #ffe0b2; }
.band-legend__swatch.blue { background: #b3e5fc; }
.band-legend__swatch.green { background: #c5e1a5; }
.band-legend__swatch.red { background: #ef5350; }
.band-legend__swatch.grey { background: #eeeeee; }

.band-legend__note {
  margin-top: 6px;
  color: #555;
  font-size: 12px;
}

@media (max-width: 575px) {
  .band-legend__items {
    gap: 6px 12px;
  }

  .band-legend__item {
    white-space: normal;
  }
}
</style>
