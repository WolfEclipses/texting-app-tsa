import React, { Fragment, FC, useEffect } from 'react';
import Wheel from '@uiw/react-color-wheel';
import ShadeSlider from '@uiw/react-color-shade-slider';
import Alpha from '@uiw/react-color-alpha';
import { useColor } from './ColorContext'; // Adjust the path as needed
import { hsvaToHex, hexToHsva } from '@uiw/color-convert';
import Button from './UI/Button';

const ColorSwatch: FC = () => {
  const { hsva, setHsva, saveColor } = useColor();

  // Effect to apply the color to the document whenever it changes
  useEffect(() => {
    const accentColor = hsvaToHex(hsva);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [hsva]);

  // Handler to update color when a button is clicked
  const handleColorChange = (hexColor: string) => {
    const newHsva = hexToHsva(hexColor);
    setHsva(newHsva);
  };

  return (
    <div className='p-2 justify-center'>
      <Fragment>
        <Wheel color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
        <ShadeSlider
          hsva={hsva}
          style={{ width: 210, marginTop: 20 }}
          onChange={(newShade) => { setHsva({ ...hsva, ...newShade }); }}
        />
        <Alpha
          hsva={hsva}
          style={{ width: 210, marginTop: 10 }}
          onChange={(newAlpha) => { setHsva({ ...hsva, ...newAlpha }); }}
        />
        <div style={{ width: '53%', height: 34, marginTop: 10, background: hsvaToHex(hsva) }}></div>
        <div className="grid grid-row-3 ">
            <span>
              <Button className="h-2 w-2 bg-red-600" onClick={() => handleColorChange('#dc2626')}></Button>
              <Button className="h-2 w-2 bg-orange-600" onClick={() => handleColorChange('#ea580c')}></Button>
              <Button className="h-2 w-2 bg-amber-600" onClick={() => handleColorChange('#d97706')}></Button>
              <Button className="h-2 w-2 bg-yellow-600" onClick={() => handleColorChange('#ca8a04')}></Button>
              <Button className="h-2 w-2 bg-lime-600" onClick={() => handleColorChange('#65a30d')}></Button>
              <Button className="h-2 w-2 bg-green-600" onClick={() => handleColorChange('#16a34a')}></Button>
              <Button className="h-2 w-2 bg-emerald-600" onClick={() => handleColorChange('#059669')}></Button>
            </span>
            <span>
              <Button className="h-2 w-2 bg-teal-600" onClick={() => handleColorChange('#0d9488')}></Button>
              <Button className="h-2 w-2 bg-cyan-600" onClick={() => handleColorChange('#0891b2')}></Button>
              <Button className="h-2 w-2 bg-sky-600" onClick={() => handleColorChange('#0284c7')}></Button>
              <Button className="h-2 w-2 bg-blue-600" onClick={() => handleColorChange('#2563eb')}></Button>
              <Button className="h-2 w-2 bg-indigo-600" onClick={() => handleColorChange('#4f46e5')}></Button>
              <Button className="h-2 w-2 bg-violet-600" onClick={() => handleColorChange('#7c3aed')}></Button>
              <Button className="h-2 w-2 bg-purple-600" onClick={() => handleColorChange('#9333ea')}></Button>
            </span>
            <span>
              <Button className="h-2 w-2 bg-fuchsia-600" onClick={() => handleColorChange('#c026d3')}></Button>
              <Button className="h-2 w-2 bg-pink-600" onClick={() => handleColorChange('#db2777')}></Button>
              <Button className="h-2 w-2 bg-rose-600" onClick={() => handleColorChange('#e11d48')}></Button>
            </span>
          </div>
        <button 
          className="mt-4 p-2 bg-blue-500 text-white rounded" 
          onClick={saveColor}
        >
          Save Color
        </button>
      </Fragment>
    </div>
  );
};

export { ColorSwatch };  
