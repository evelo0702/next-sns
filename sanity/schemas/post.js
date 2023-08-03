export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo1',
      name: 'photo1',
      type: 'image',
    },
    {
      title: 'Photo2',
      name: 'photo2',
      type: 'image',
    },
    {
      title: 'Photo3',
      name: 'photo3',
      type: 'image',
    },
    {
      title: 'Photo4',
      name: 'photo4',
      type: 'image',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'string',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content',
      authorName: 'author.name',
      authorID: 'author.id',
      media: 'photo1',
    },
    prepare(selection) {
      const {title, authorName, authorID, media} = selection
      return {
        title,
        media,
        subtitle: `by ${authorName}(${authorID})`,
      }
    },
  },
}
