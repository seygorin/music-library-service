export const usePageMeta = () => {
  const setMeta = (title: string, description?: string) => {
    useHead({
      title,
      meta: description
        ? [
            {
              name: 'description',
              content: description,
            },
          ]
        : [],
    })
  }

  return {
    setMeta,
  }
}
