import { describe, expect, it } from 'vitest';
import {
  advanceAnimationPlayback,
  parseMcmetaAnimation,
  resolveAnimationTimeline,
} from './TextureAtlas';

describe('TextureAtlas animation helpers', () => {
  it('parses explicit .mcmeta frame lists and resolves timeline durations', () => {
    const parsed = parseMcmetaAnimation(
      JSON.stringify({
        animation: {
          frametime: 5,
          frames: [0, { index: 2, time: 3 }, 1],
        },
      }),
    );
    const timeline = resolveAnimationTimeline(4, parsed);

    expect(timeline).toEqual([
      { index: 0, durationTicks: 5 },
      { index: 2, durationTicks: 3 },
      { index: 1, durationTicks: 5 },
    ]);
  });

  it('builds implicit sequential timeline when .mcmeta has no frame list', () => {
    const parsed = parseMcmetaAnimation(
      JSON.stringify({
        animation: {
          frametime: 2,
        },
      }),
    );
    const timeline = resolveAnimationTimeline(3, parsed);

    expect(timeline).toEqual([
      { index: 0, durationTicks: 2 },
      { index: 1, durationTicks: 2 },
      { index: 2, durationTicks: 2 },
    ]);
  });

  it('does not report frame change while frame duration is not elapsed', () => {
    const timeline = resolveAnimationTimeline(3, parseMcmetaAnimation('{"animation":{"frametime":2}}'));
    const noChange = advanceAnimationPlayback(
      timeline,
      {
        timelineIndex: 0,
        ticksIntoFrame: 0,
        currentFrame: 0,
      },
      1,
    );

    expect(noChange.changed).toBe(false);
    expect(noChange.currentFrame).toBe(0);

    const changed = advanceAnimationPlayback(timeline, noChange, 1);
    expect(changed.changed).toBe(true);
    expect(changed.currentFrame).toBe(1);
  });
});
