import React, { useState, useRef, useEffect } from 'react';
import { Transition, config, animated } from 'react-spring/renderprops';
import styled from 'styled-components/macro';

const spring = { ...config.default, precision: 0.1 };

export type Item = {
  key: number;
  msg: string;
};

type MessageHubProps = {
  newMessage?: Item;
};

const MessageHub = ({ newMessage }: MessageHubProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const { current: cancelMap } = useRef(new WeakMap<Item, Function>());

  const remove = (item: Item) =>
    setItems((items) => items.filter((i) => i.key !== item.key));
  const config = (item: Item, state: string) =>
    state === 'leave' ? [{ duration: 3000 }, spring, spring] : spring;
  const leave = (item: Item) => async (next: Function, cancel: Function) => {
    cancelMap.set(item, cancel);
    await next({ life: 0 });
    await next({ opacity: 0 });
    await next({ height: 0 }, true);
  };

  useEffect(() => {
    if (newMessage && newMessage.msg.length > 0) {
      setItems((i) => [...i, newMessage]);
    }
  }, [newMessage]);

  return (
    <>
      <div>
        <Container>
          {/* @ts-ignore */}
          <Transition
            native
            items={items}
            keys={(item) => item.key}
            from={{ opacity: 0, height: 0, life: 1 }}
            enter={{ opacity: 1, height: 'auto' }}
            leave={leave}
            onRest={remove}
            config={config}
          >
            {(item) => ({ life, ...props }) => (
              <Msg style={props}>
                <Content>
                  <Life
                    style={{
                      // @ts-ignore
                      right: life.interpolate((l) => `calc(${l * 100}%)`),
                    }}
                  />
                  <p>{item.msg}</p>
                </Content>
              </Msg>
            )}
          </Transition>
        </Container>
      </div>
    </>
  );
};

const Container = styled.div`
  width: 15.6rem;
  position: fixed;
  bottom: 0.625rem;
  right: 0.625rem;
  display: flex;
  flex-direction: column;
`;

const Msg = styled(animated.div)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 15.6rem;
`;

const Content = styled.div`
  position: relative;
  color: var(--main-text-color-200);
  background: #171717;
  margin-top: 0.625rem;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow: hidden;

  p {
    margin: 0;
  }
`;

const Life = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  background: var(--main-bg-color-500);
  height: 4px;
`;

export default MessageHub;
