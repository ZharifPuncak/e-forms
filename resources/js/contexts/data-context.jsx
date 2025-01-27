
import { JobProvider } from './data-context/job-context';
// import { ContextProvider2 } from '.../Context2';
// import { ContextProvider3 } from '.../Context3';
// import { ContextProvider4 } from '.../Context4';
import { combineComponents } from './utils/combine-context';
const providers = [
    JobProvider
//   ContextProvider2,
//   ContextProvider3,
//   ContextProvider4
]
export const DataProvider = combineComponents(...providers);