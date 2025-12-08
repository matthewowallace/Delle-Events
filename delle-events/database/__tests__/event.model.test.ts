import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Event } from '../event.model';

describe('Event model pre-save hook', () => {
  let mongo: MongoMemoryServer;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  afterEach(async () => {
    await Event.deleteMany({});
  });

  function createValidEventOverrides(overrides: Partial<Record<string, unknown>> = {}) {
    const base = {
      title: 'My Awesome Event!',
      slug: '', // let the pre-save hook generate this
      description: 'A great event description.',
      overview: 'Overview of the event.',
      image: 'https://example.com/image.png',
      venue: 'Main Hall',
      location: 'New York',
      date: '2025-01-15T16:30:00Z', // intentionally non-normalized
      time: '9:05', // intentionally non-normalized
      mode: 'In-person',
      audience: 'Developers',
      agenda: ['Intro'],
      organizer: 'Delle',
      tags: ['tech'],
    };

    return { ...base, ...overrides };
  }

  it('generates a slug for a new event before saving', async () => {
    const event = new Event(createValidEventOverrides());

    await event.save();

    expect(event.slug).toBe('my-awesome-event');
  });

  it('updates the slug when the title is modified', async () => {
    const event = new Event(createValidEventOverrides({ title: 'Original Title' }));
    await event.save();

    const originalSlug = event.slug;

    event.title = 'Updated Event Title';
    await event.save();

    expect(event.slug).toBe('updated-event-title');
    expect(event.slug).not.toBe(originalSlug);
  });

  it('normalizes the date when the date field is modified', async () => {
    const event = new Event(
      createValidEventOverrides({ date: '2025-02-20T10:15:30.000Z' }),
    );

    await event.save();

    // Pre-save hook should normalize to YYYY-MM-DD
    expect(event.date).toBe('2025-02-20');
  });

  it('normalizes the time when the time field is modified', async () => {
    const event = new Event(createValidEventOverrides({ time: '7:03' }));

    await event.save();

    // Pre-save hook should normalize to HH:MM (24h)
    expect(event.time).toBe('07:03');
  });

  it('throws an error when required fields are missing or empty', async () => {
    const event = new Event(
      createValidEventOverrides({
        title: '   ', // invalid empty string after trim
      }),
    );

    await expect(event.save()).rejects.toThrow(
      'Field "title" is required and cannot be empty.',
    );
  });
});
