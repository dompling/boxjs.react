import config from "@/utils/config";
import { history, useModel } from "@@/exports";
import {
  Avatar,
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "hidden",
  background: "unset",
  boxShadow: "unset",
  borderRadius: 0,
}));

let timeoutCount: Record<string, any> = {};
let timeout: Record<string, any> = {};

interface DItem {
  id: string;
  originalIndex: number;
}

const GridItem: React.FC<{
  script: string | null;
  index: number;
  item?: boxjs.App;
  data?: (boxjs.App | undefined)[];
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}> = ({ item, script, moveCard, findCard, data, ...props }) => {
  const matches = useMediaQuery("(min-width:960px)");

  const id = `${item?.id}_${item?.author}`;
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript, fetchSave } = useModel("api");

  const originalIndex = findCard(id).index;
  const [{ isDragging, offset }, drag] = useDrag(
    () => ({
      type: "grid",
      item: { id, originalIndex },
      collect: (monitor) => {
        const clientOffset = monitor.getSourceClientOffset();
        let offset = { x: 0, y: 0 };
        if (clientOffset) {
          offset.x = clientOffset.x;
          offset.y = clientOffset.y;
        }
        return {
          offset,
          isDragging: monitor.isDragging(),
        };
      },
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) moveCard(droppedId, originalIndex);
        const favApp = data?.map((item) => item?.id);
        const usercfgs = initialState?.boxdata.usercfgs;
        fetchSave.run({
          key: config.userCfgs,
          val: JSON.stringify({ ...usercfgs, favapps: favApp }),
        });
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "grid",
      hover({ id: draggedId }: DItem) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <>
      <Item
        key={`${item?.id}/${item?.author}/${item?.name}`}
        sx={{
          flex: matches ? `0 0 ${100 / 6}%` : `0 0 25%`,
          opacity,
          transform: `translate(0,0)`,
          pt: 1,
          pb: 1,
        }}
        ref={(node) => drag(drop(node))}
        onClick={() => {
          const timeKey = `${item?.id}`;
          if (timeoutCount[timeKey] === undefined) timeoutCount[timeKey] = 0;
          timeoutCount[timeKey] += 1;

          timeout[timeKey] = setTimeout(() => {
            if (timeout[timeKey] !== undefined) clearTimeout(timeout[timeKey]);
            if (timeoutCount[timeKey] === 2) {
              timeoutCount[timeKey] = 0;

              if (!script) return history.push(`/app/${timeKey}`);
              fetchRunScript.run({ url: script, isRemote: true });
            } else if (timeoutCount[timeKey] === 1) {
              history.push(`/app/${timeKey}`);
            }
            timeoutCount = {};
          }, 200);
        }}
      >
        <Stack spacing={1} justifyContent={"center"} alignItems={"center"}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: (theme) => theme.shadows[5],
            }}
          >
            <Avatar
              variant="square"
              alt={item?.name}
              src={item?.icon}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
            {fetchRunScript.fetches[`${script}`]?.loading && (
              <LinearProgress
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                }}
              />
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: 12,
              maxWidth: 56,
              color: initialState?.boxdata.usercfgs.bgimg ? "#fff" : "unset",
              width: `100%`,
              fontWeight: "bold",
              textShadow: initialState?.boxdata.usercfgs.bgimg
                ? "black 0.1em 0.1em 0.2em"
                : "unset",
            }}
            noWrap
          >
            {item?.name}
          </Typography>
        </Stack>
      </Item>
      {isDragging && initialState?.isMobile && (
        <Stack
          sx={{
            zIndex: -1,
            opacity: 0.5,
            position: "fixed",
            left: offset?.x,
            top: offset?.y,
          }}
          spacing={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              boxShadow: (theme) => theme.shadows[4],
            }}
          >
            <Avatar
              variant="square"
              alt={item?.name}
              src={item?.icon}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

const DropItem = memo(GridItem);

function Page() {
  const { initialState } = useModel("@@initialState");

  const [, drop] = useDrop(() => ({ accept: "grid" }));

  const favApp =
    initialState?.boxdata?.usercfgs.favapps
      .map((item) => {
        return initialState?.apps.find((app) => app.id === item);
      })
      .filter((item) => !!item) || [];

  const [cards, setCards] = useState<(boxjs.App | undefined)[]>(favApp);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c?.id}_${c?.author}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const UI = initialState?.ui(initialState.boxdata);

  return (
    <Stack ref={drop} direction={"row"} flexWrap={"wrap"}>
      {cards?.map((item, index) => {
        UI?.loadAppBaseInfo(item);
        let script: any = null;
        if (item?.script) {
          script = item?.script;
        } else if (item?.scripts && item?.scripts[0]?.script) {
          script = item?.scripts[0]?.script;
        }
        return (
          <DropItem
            item={item}
            data={cards}
            script={script}
            findCard={findCard}
            moveCard={moveCard}
            index={index}
            key={`${item?.id}-${item?.author}`}
          />
        );
      })}
    </Stack>
  );
}

export default function Home() {
  const { initialState } = useModel("@@initialState");
  return (
    <Box pt={1} component={"div"}>
      <DndProvider
        options={{ delay: 400 }}
        backend={initialState?.isMobile ? TouchBackend : HTML5Backend}
      >
        <Page />
      </DndProvider>
    </Box>
  );
}
