import { D2ManifestDefinitions } from 'app/destiny2/d2-definitions';
import BungieImage from 'app/dim-ui/BungieImage';
import { DimItem } from 'app/inventory/item-types';
import { ObjectiveValue } from 'app/progress/Objective';
import MetricBanner from 'app/records/MetricBanner';
import React from 'react';
import styles from './EmblemPreview.m.scss';

export default function EmblemPreview({
  item,
  defs,
}: {
  item: DimItem;
  defs: D2ManifestDefinitions;
}) {
  const metricDef = item.metricObjective && item.metricHash && defs.Metric.get(item.metricHash);
  const parentPresentationNode =
    metricDef && defs.PresentationNode.get(metricDef.parentNodeHashes[0]);
  const trait =
    metricDef && defs.Trait.get(metricDef.traitHashes[metricDef.traitHashes.length - 1]);

  const objectiveHash = item.metricObjective?.objectiveHash;
  const objectiveDef = objectiveHash !== undefined && defs.Objective.get(objectiveHash);

  return (
    <div className={styles.container}>
      {item.metricObjective && item.metricHash !== undefined && (
        <MetricBanner
          className={styles.banner}
          defs={defs}
          metricHash={item.metricHash}
          objectiveProgress={item.metricObjective}
        />
      )}
      {item.metricObjective?.progress !== undefined && objectiveDef && (
        <div className={styles.value}>
          <ObjectiveValue objectiveDef={objectiveDef} progress={item.metricObjective.progress} />
        </div>
      )}
      {item.secondaryIcon && <BungieImage src={item.secondaryIcon} width="237" height="48" />}
      {parentPresentationNode && metricDef && trait && (
        <div>
          {trait.displayProperties.name}
          {' // '}
          {parentPresentationNode.displayProperties.name}
          {' // '}
          {metricDef.displayProperties.name}
        </div>
      )}
    </div>
  );
}
