# Library for Angular 2 - Review UI
This is a basic setup for Angular 2 which allows you to embed a review component in your application.
Sample in below website uses angular-review-ui@1.0.0.

- - -

### Installation

You can install ***angular-review-ui*** using npm:

  ```bash
  npm install angular-review-ui --save
  ```

### Import
```typescript
// In your App's module:
import { ReviewModule, ReviewComponent } from 'angular-review-ui';

imports: [
    ReviewModule
],
declarations: [
    ReviewComponent
]
```

### Systemjs
```typescript
// In systemjs.config.js
map: {
	  'angular-review-ui': 'node_modules/angular-review-ui'
},
packages: {
	'angular-review-ui': {
      main: './index.js',
			defaultExtension: 'js'
		}
}
```

### Simple Review Component

Import `ReviewComponent` in your app. Then you can use `review` component:
```html
<review-component></review-component>
```

### Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!
