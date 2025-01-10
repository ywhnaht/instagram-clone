import { Box, Field, Input, defineStyle } from '@chakra-ui/react';

const floatingStyles = defineStyle({
    pos: 'absolute',
    bg: 'bg',
    px: '0.5',
    top: '-3',
    insetStart: '2',
    fontWeight: 'normal',
    pointerEvents: 'none',
    transition: 'position',
    _peerPlaceholderShown: {
        color: 'fg.muted',
        top: '2.5',
        insetStart: '3',
    },
    _peerFocusVisible: {
        color: 'fg',
        top: '-3',
        insetStart: '2',
    },
});

function InputBtn({ value, placeholder, type, length}) {
    return (
        <Field.Root>
            <Input className={`peer my-1 px-2 text-sm bg-slate-100 outline-none border border-gray-300 focus:border-gray-400 ${length}`} type={type} placeholder="" />
            <Field.Label className='text-sm bg-slate-100' css={floatingStyles}>{value}</Field.Label>
        </Field.Root>
    );
}

export default InputBtn;
