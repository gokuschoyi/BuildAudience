import { useState } from "react";
import { Icons } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import styled from "styled-components";
import { Trigger } from "./Trigger";
import { ItemActions } from "./ItemActions";
import { Switch } from "./Switch";
import { TimeTracker } from "./TimeTracker";
import React from "react";
const variants = {
    container: {
        open: {
            y: 0,
            opacity: 1
        },
        closed: {
            y: -10,
            opacity: 0
        }
    },
    // used to stagger item animation when switching from closed to open and vice versa
    content: {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    },
    item: {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    }
};
const UnreadFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    cursor: pointer;
  }
`;
const Container = styled(motion.aside)`
  width: auto
  border-radius: 8px;
  overflow: hidden;
`;
const Footer = styled.footer`
  background: #222;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled(motion.section)`
  background: #000;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #fff;
  padding: 0.2rem;
  position: relative;
  h4 {
    margin: 0;
    text-align: center;
    padding: 2rem;
  }
`;
const IconWrapper = styled.div`
  width: 32px;
`;
const Item = styled(motion.article)`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  gap: 8px;
  padding: 0.8rem;
  background: rgba(54, 50, 50);
  border-radius: 8px;
`;
const Header = styled.header`
  background: #222;
  color: #fff;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export function NotificationCenter() {
    const { notifications, clear, markAllAsRead, markAsRead, remove, unreadCount } = useNotificationCenter();
    const [showUnreadOnly, toggleFilter] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <Trigger onClick={() => setIsOpen(!isOpen)} count={unreadCount} />
            {isOpen === true ?
                <Container
                    style={{ position: 'fixed', marginLeft: '-52px' }}
                    initial={false}
                    variants={variants.container}
                    animate={isOpen ? "open" : "closed"}
                >
                    <Header>
                        <h3>Notifications</h3>
                        <UnreadFilter>
                            <label htmlFor="unread-filter">Unread</label>
                            <Switch
                                id="unread-filter"
                                checked={showUnreadOnly}
                                onChange={() => {
                                    toggleFilter(!showUnreadOnly);
                                }}
                            />
                        </UnreadFilter>
                    </Header>
                    <AnimatePresence>
                        <Content
                            variants={variants.content}
                            animate={isOpen ? "open" : "closed"}
                        >
                            {(!notifications.length ||
                                (unreadCount === 0 && showUnreadOnly)) && (
                                    <motion.h4
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        No Notifications
                                    </motion.h4>
                                )}
                            <AnimatePresence>
                                {(showUnreadOnly
                                    ? notifications.filter((v) => !v.read)
                                    : notifications
                                ).map((notification) => {
                                    return (
                                        <motion.div
                                            key={notification.id}
                                            layout
                                            initial={{ scale: 0.4, opacity: 0, y: 50 }}
                                            exit={{
                                                scale: 0,
                                                opacity: 0,
                                                transition: { duration: 0.2 }
                                            }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            style={{ padding: "0.8rem" }}
                                        >
                                            <Item key={notification.id} variants={variants.item}>
                                                <IconWrapper>
                                                    {notification.type === "success" &&
                                                        Icons.success({
                                                            theme: notification.theme || "light",
                                                            type: notification.type
                                                        })
                                                    }
                                                    {notification.type === "warning" &&
                                                        Icons.warning({
                                                            theme: notification.theme || "light",
                                                            type: notification.type
                                                        })
                                                    }
                                                </IconWrapper>
                                                <div>
                                                    <div>{notification.content}</div>
                                                    {/* <div style={{ width: '300px', justifyContent:'' }}>{notification.data.text}</div> */}
                                                    <TimeTracker createdAt={notification.createdAt} />
                                                </div>
                                                <ItemActions
                                                    notification={notification}
                                                    markAsRead={markAsRead}
                                                    remove={remove}
                                                />
                                            </Item>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </Content>
                    </AnimatePresence>
                    <Footer>
                        <button className="btn btn-outline-warning" onClick={clear}>Clear All</button>
                        <button className="btn btn-outline-warning" onClick={markAllAsRead}>Mark All as read</button>
                    </Footer>
                </Container>
                : null}
        </div>
    );
}