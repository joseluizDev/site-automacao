// src/components/NumberFormatCustom.js
import React from 'react';
import { NumericFormat } from 'react-number-format';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
   const { onChange, ...other } = props;

   return (
      <NumericFormat
         {...other}
         getInputRef={ref}
         onValueChange={(values) => {
            onChange({
               target: {
                  name: props.name,
                  value: values.value,
               },
            });
         }}
         thousandSeparator="."
         decimalSeparator=","
         isNumericString
         prefix="R$ "
         decimalScale={2}
         fixedDecimalScale
      />
   );
});

export default NumberFormatCustom;
