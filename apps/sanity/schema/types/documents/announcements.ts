import { HiSpeakerphone } from 'react-icons/hi';
import { defineField, defineType } from 'sanity';
import { validPostTimestamps } from '@pkg/sanity-toolkit/studio/schema/validation';

interface Prepare {
  title?: string;
  startDate?: string;
  endDate?: string;
}

export const announcements = defineType({
  name: 'announcement',
  title: 'Announcement Bar',
  type: 'document',
  icon: HiSpeakerphone,
  fields: [
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            'Announcements work best when they are concise—consider reduced the length of the announcement message.',
          ),
    }),
    defineField({
      name: 'startDate',
      title: 'Optional Start Time',
      type: 'datetime',
      description:
        'Add a time from which this announcement will start showing once added to active theme. Leave blank to show as soon as its added. Time set in UTC.',
      options: {
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'Optional End Time',
      type: 'datetime',
      description:
        'Add a time from which this announcement will stop showing even when added to active them. Leave blank to always show when added. Time set in UTC.',
      options: {
        timeFormat: 'HH:mm',
      },
      validation: (rule) =>
        rule
          .custom(
            validPostTimestamps('startDate', 'before', undefined, 'End Date', 'Start Date'),
          )
          .error(),
    }),
  ],
  preview: {
    select: {
      title: 'message',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, startDate, endDate }: Prepare) {
      const isActive = isAnnouncementActive(startDate, endDate);
      const status = isActive ? '🟢' : '⚫';
      const dateRange = formatDateRange(startDate, endDate);

      return {
        title: title ?? '[No message set]',
        subtitle: `${status}${dateRange ? ` • ${dateRange}` : ''}`,
      };
    },
  },
});

function isAnnouncementActive(startDate?: string, endDate?: string): boolean {
  const now = new Date();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  return (!start || now >= start) && (!end || now <= end);
}

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate && !endDate) return '';

  const now = new Date();
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const parts = [
    startDate &&
      `${new Date(startDate) <= now ? 'Started' : 'Starts'}: ${formatDate(startDate)}`,
    endDate && `${new Date(endDate) < now ? 'Ended' : 'Ends'}: ${formatDate(endDate)}`,
  ].filter(Boolean);

  return parts.join(' • ');
}
