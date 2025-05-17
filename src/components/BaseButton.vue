<template>
    <div>
        <button
            :type="type"
            :disabled="disabled"
            :class="`${inactive ? 'inactive' : ''}`"
            @click="handleClick"
        >
            <slot>
                {{ label }} 
            </slot>
        </button>
    </div>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inactive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['clickBtn'],
    setup(_, { emit }) {
        const handleClick = (event) => {
            if (event.target.disabled) {
                event.preventDefault();
                return;
            }
            emit('clickBtn', event);
        };

        return {
            handleClick
        };
    }
}
</script>

<style scoped>
    button {
        background-color: #F22539;
        border-radius: 60px;
        border: 0px;
        color: white;
        cursor: pointer;
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        font-weight: bold;
        padding: 11px 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:disabled {
        background-color: #BFBFBF;
        cursor: not-allowed;
    }

    button.inactive {
        background-color: #BFBFBF;
    }
</style>
