import { Avatar, Box, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function ChatList({ AllUsersChats, user }) {
  return (
      <Box
          sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "100vh",
              paddingRight: 1,
              paddingBottom: 3,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              scrollbarColor: "transparent transparent",
          }}
      >
          <List>
              {AllUsersChats.map((chat, index) => {
                  const isGroup = chat.isGroupChat;
                  const otherUser = !isGroup
                      ? chat.users.find((u) => u._id !== user._id)
                      : null;

                  return (
                      <ListItem
                          key={chat._id || index}
                          sx={{
                              borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              borderRadius: 12,
                              gap: 0.3,
                              marginTop: 1,
                              "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  cursor: "pointer",
                              },
                              transition: "all 0.2s ease",
                              paddingY: { xs: 0.5, sm: 1 },
                              paddingX: { xs: 1, sm: 2 },
                          }}
                      >
                          <Box
                              sx={{ display: "flex", alignItems: "center", gap: { xs: 0.7, sm: 1 } }}
                          >
                              <Avatar
                                  src={isGroup ? user.image : otherUser?.image}
                                  alt={isGroup ? chat.chatName : otherUser?.name}
                                  sx={{ width: { xs: 28, sm: 35 }, height: { xs: 28, sm: 35 } }}
                              />
                              <ListItemText
                                  primary={isGroup ? chat.chatName : otherUser?.name}
                                  primaryTypographyProps={{
                                      sx: {
                                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                                          color: "whitesmoke",
                                          fontWeight: 500,
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          maxWidth: { xs: "120px", sm: "200px" },
                                      },
                                  }}
                              />
                          </Box>

                          {isGroup && (
                              <Typography
                                  sx={{
                                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                      color: "rgba(255,255,255,0.6)",
                                      marginLeft: { xs: 4, sm: 5 },
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      maxWidth: { xs: "150px", sm: "220px" },
                                      display: { sm: "none", lg: "block" },
                                      flexShrink: 1,
                                  }}
                                  noWrap
                              >
                                  group:{" "}
                                  {chat.users
                                      .slice(0, 2)
                                      .map((u) => (u._id === user._id ? "You" : u.name))
                                      .join(", ")}
                                  {chat.users.length > 2 && " ..."}
                              </Typography>
                          )}
                      </ListItem>
                  );
              })}
          </List>
      </Box>
  )
}
