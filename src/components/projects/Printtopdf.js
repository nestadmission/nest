import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import  ComponentToPrint  from './Receipt';

const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default Example