import { describe, expect, it } from 'vitest';
import {
  getYoutubeVideoId,
  getYoutubeEmbedUrl,
  getVimeoEmbedUrl,
  getVideoEmbedUrl,
  VideoEmbedVariant,
} from '../index';

describe('getYoutubeVideoId', () => {
  it('extracts video ID from various YouTube URL formats', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ',
    );
    expect(getYoutubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(getYoutubeVideoId('invalid-url')).toBe(null);
  });
});

describe('getYoutubeEmbedUrl', () => {
  it('generates correct embed URL for inline variant', () => {
    const url = getYoutubeEmbedUrl({
      youtubeVideoId: 'dQw4w9WgXcQ',
      variant: VideoEmbedVariant.Inline,
    });
    expect(url).toContain('youtube.com/embed/dQw4w9WgXcQ');
    expect(url).toContain('modestbranding=1');
    expect(url).not.toContain('mute=1');
  });

  it('generates correct embed URL for background variant', () => {
    const url = getYoutubeEmbedUrl({
      youtubeVideoId: 'dQw4w9WgXcQ',
      variant: VideoEmbedVariant.Background,
    });
    expect(url).toContain('mute=1');
    expect(url).toContain('autoplay=1');
    expect(url).toContain('loop=1');
  });
});

describe('getVimeoEmbedUrl', () => {
  it('generates correct embed URL for inline variant', () => {
    const url = getVimeoEmbedUrl({
      vimeoVideoId: '123456789',
      variant: VideoEmbedVariant.Inline,
    });
    expect(url).toContain('player.vimeo.com/video/123456789');
    expect(url).not.toContain('background=true');
  });

  it('generates correct embed URL for background variant', () => {
    const url = getVimeoEmbedUrl({
      vimeoVideoId: '123456789',
      variant: VideoEmbedVariant.Background,
    });
    expect(url).toContain('background=true');
    expect(url).toContain('muted=true');
    expect(url).toContain('autoplay=true');
  });

  it('includes hash ID when provided', () => {
    const url = getVimeoEmbedUrl({
      vimeoVideoId: '123456789',
      vimeoHashId: 'abc123',
    });
    expect(url).toContain('h=abc123');
  });
});

describe('getVideoEmbedUrl', () => {
  it('handles YouTube URLs', () => {
    const url = getVideoEmbedUrl({
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
    expect(url).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('handles Vimeo URLs', () => {
    const url = getVideoEmbedUrl({
      videoUrl: 'https://vimeo.com/123456789',
    });
    expect(url).toContain('player.vimeo.com/video/123456789');
  });

  it('throws error for invalid URLs', () => {
    expect(() =>
      getVideoEmbedUrl({
        videoUrl: 'https://invalid-url.com',
      }),
    ).toThrow();
  });
});
