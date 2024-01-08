import useMenuStore from "./MenuStore";

const useMenu = () => {
  const [activeId, setActiveId] = useMenuStore((state) => [state.activeId, state.setActiveId]);
  return { activeId, setActiveId };
};

export default useMenu;
