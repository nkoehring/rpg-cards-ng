declare module "*.vue" {
  import { defineComponent } from "vue"
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module '*.txt' {
  const content: string
  export default content
}

declare module '@editorjs/paragraph'
declare module '@editorjs/list'
