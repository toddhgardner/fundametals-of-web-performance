import { onFCP, onTTFB, onLCP, onCLS, onINP } from 'https://unpkg.com/web-vitals@4/dist/web-vitals.attribution.js?module';

window.addEventListener("DOMContentLoaded", async () => {
  onFCP(logSummaryInfo);
  onTTFB(logSummaryInfo);
  onLCP(logSummaryInfo);
  onCLS(logSummaryInfo);
  onINP(logSummaryInfo);
});

const LOG_PREFIX = '[FUNDAMENTALS OF WEB PERFORMANCE]';
const COLOR_GOOD = '#0CCE6A';
const COLOR_NEEDS_IMPROVEMENT = '#FFA400';
const COLOR_POOR = '#FF4E42';
const RATING_COLORS = {
  'good': COLOR_GOOD,
  'needs-improvement': COLOR_NEEDS_IMPROVEMENT,
  'poor': COLOR_POOR
};

const secondsFormatter = new Intl.NumberFormat(undefined, {
  unit: "second",
  style: 'unit',
  unitDisplay: "short",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
});

const millisecondsFormatter = new Intl.NumberFormat(undefined, {
  unit: "millisecond",
  style: 'unit',
  unitDisplay: "short",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const clsFormatter = new Intl.NumberFormat(undefined, {
  unitDisplay: "short",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

async function logSummaryInfo(metric) {
  let formattedValue;
  switch (metric.name) {
    case 'CLS':
      formattedValue = clsFormatter.format(metric.value);
      break;
    case 'INP':
    case 'Interaction':
      formattedValue = millisecondsFormatter.format(metric.value);
      break;
    default:
      formattedValue = secondsFormatter.format(metric.value / 1000);
  }
  console.groupCollapsed(
    `${LOG_PREFIX} ${metric.name} %c${formattedValue} (${metric.rating})`,
    `color: ${RATING_COLORS[metric.rating] || 'inherit'}`
  );

  if (metric.name == 'LCP' &&
    metric.attribution &&
    metric.attribution.lcpEntry &&
    metric.attribution.navigationEntry) {
    console.log('LCP element:', metric.attribution.lcpEntry.element);
    console.table([{
      'LCP sub-part': 'Time to first byte',
      'Time (ms)': Math.round(metric.attribution.timeToFirstByte, 0),
      '% Total': Math.round((metric.attribution.timeToFirstByte / metric.value) * 100) + "%"
    }, {
      'LCP sub-part': 'Resource load delay',
      'Time (ms)': Math.round(metric.attribution.resourceLoadDelay, 0),
      '% Total': Math.round((metric.attribution.resourceLoadDelay / metric.value) * 100) + "%"
    }, {
      'LCP sub-part': 'Resource load duration',
      'Time (ms)': Math.round(metric.attribution.resourceLoadDuration, 0),
      '% Total': Math.round((metric.attribution.resourceLoadDuration / metric.value) * 100) + "%"
    }, {
      'LCP sub-part': 'Element render delay',
      'Time (ms)': Math.round(metric.attribution.elementRenderDelay, 0),
      '% Total': Math.round((metric.attribution.elementRenderDelay / metric.value) * 100) + "%"
    }]);
  }

  else if (metric.name == 'FCP' &&
    metric.attribution &&
    metric.attribution.fcpEntry &&
    metric.attribution.navigationEntry) {
    console.log('FCP loadState:', metric.attribution.loadState);
    console.table([{
      'FCP sub-part': 'Time to first byte',
      'Time (ms)': Math.round(metric.attribution.timeToFirstByte, 0),
      '% Total': Math.round((metric.attribution.timeToFirstByte / metric.value) * 100) + "%"
    }, {
      'FCP sub-part': 'FCP render delay',
      'Time (ms)': Math.round(metric.attribution.firstByteToFCP, 0),
      '% Total': Math.round((metric.attribution.firstByteToFCP / metric.value) * 100) + "%"
    }]);
  }

  else if (metric.name == 'CLS' && metric.entries.length) {
    for (const entry of metric.entries) {
      console.log('Layout shift - score: ', Math.round(entry.value * 10000) / 10000);
      for (const source of entry.sources) {
        console.log(source.node);
      }
    };
  }

  else if ((metric.name == 'INP' || metric.name == 'Interaction') && metric.attribution) {
    const eventTarget = metric.attribution.interactionTargetElement;
    console.log('Interaction target:', eventTarget || metric.attribution.interactionTarget);
    console.log(`Interaction event type: %c${metric.attribution.interactionType}`, 'font-family: monospace');

    // Sub parts are only available for INP events and not Interactions
    if (metric.name == 'INP') {
      console.table([{
        'Interaction sub-part': 'Input delay',
        'Time (ms)': Math.round(metric.attribution.inputDelay, 0),
        '% Total': Math.round((metric.attribution.inputDelay / metric.value) * 100) + "%"
      },
      {
        'Interaction sub-part': 'Processing duration',
        'Time (ms)': Math.round(metric.attribution.processingDuration, 0),
        '% Total': Math.round((metric.attribution.processingDuration / metric.value) * 100) + "%"
      },
      {
        'Interaction sub-part': 'Presentation delay',
        'Time (ms)': Math.round(metric.attribution.presentationDelay, 0),
        '% Total': Math.round((metric.attribution.presentationDelay / metric.value) * 100) + "%"
      }]);
    }

    if (metric.attribution.longAnimationFrameEntries) {

      const allScripts = metric.attribution.longAnimationFrameEntries.map(a => a.scripts).flat();

      if (allScripts.length > 0) {

        const sortedScripts = allScripts.sort((a, b) => b.duration - a.duration);

        // Pull out the pieces of interest for console table
        scriptData = sortedScripts.map((a) => (
          {
            'Duration': Math.round(a.duration, 0),
            'Type': a.invokerType || null,
            'Invoker': a.invoker || null,
            'Function': a.sourceFunctionName || null,
            'Source (links below)': a.sourceURL || null,
            'Char position': a.sourceCharPosition || null
          }
        ));
        console.log("Long Animation Frame scripts:");
        console.table(scriptData);

        // Get a list of scripts by sourceURL so we can log to console for
        // easy linked lookup. We won't include sourceCharPosition as
        // Devtools doesn't support linking to a character position and only
        // line numbers.
        const scriptsBySource = sortedScripts.reduce((acc, { sourceURL, duration }) => {
          if (sourceURL) { // Exclude empty URLs
            (acc[sourceURL] = acc[sourceURL] || []).push(duration);
          }
          return acc;
        }, {});

        for (const [key, value] of Object.entries(scriptsBySource)) {
          console.log(`Script source link: ${key} (Duration${value.length > 1 ? 's' : ''}: ${value})`);
        }

      }
    }
  }

  else if (metric.name == 'TTFB' &&
    metric.attribution &&
    metric.attribution.navigationEntry) {
    console.log('TTFB navigation type:', metric.navigationType);
    console.table([{
      'TTFB sub-part': 'Waiting duration',
      'Time (ms)': Math.round(metric.attribution.waitingDuration, 0),
      '% Total': Math.round((metric.attribution.waitingDuration / metric.value) * 100) + "%"
    }, {
      'TTFB sub-part': 'Cache duration',
      'Time (ms)': Math.round(metric.attribution.cacheDuration, 0),
      '% Total': Math.round((metric.attribution.cacheDuration / metric.value) * 100) + "%"
    }, {
      'TTFB sub-part': 'DNS duration',
      'Time (ms)': Math.round(metric.attribution.dnsDuration, 0),
      '% Total': Math.round((metric.attribution.dnsDuration / metric.value) * 100) + "%"
    }, {
      'TTFB sub-part': 'Connection duration',
      'Time (ms)': Math.round(metric.attribution.connectionDuration, 0),
      '% Total': Math.round((metric.attribution.connectionDuration / metric.value) * 100) + "%"
    }, {
      'TTFB sub-part': 'Request duration',
      'Time (ms)': Math.round(metric.attribution.requestDuration, 0),
      '% Total': Math.round((metric.attribution.requestDuration / metric.value) * 100) + "%"
    }]);
  }

  console.log(metric);
  console.groupEnd();
}