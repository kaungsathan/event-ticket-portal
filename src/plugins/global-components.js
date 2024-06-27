import BadgeDirective from 'primevue/badgedirective'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import Tooltip from 'primevue/tooltip'

import { app } from './main-app'

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('badge', BadgeDirective)
app.directive('styleclass', StyleClass)
