import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import type { Suggestion } from "../../services/search";

export type SuggestionListProps = {
  /** Current user query (for highlighting matched text) */
  query: string;
  /** Suggestions to render */
  suggestions: Suggestion[];
  /** Called when user clicks a suggestion item */
  onSelect: (s: Suggestion) => void;
  /** Optional: show a loading spinner at the top */
  loading?: boolean;
  /** Optional: shown when there are no suggestions and not loading */
  emptyMessage?: string;
  /** Optional: className for the root wrapper (position it under your input) */
  className?: string;
  /** Optional: inline style for the root wrapper */
  style?: React.CSSProperties;
  /** Optional: max height of the list area (scrolls beyond) */
  maxHeight?: number | string;
};

/**
 * Lightweight, controlled suggestion dropdown.
 *
 * Positioning: The parent should wrap the search input in a relatively-positioned
 * container and pass a className/style to place this Paper absolutely underneath.
 *
 * Accessibility: Uses listbox role semantics.
 */
const SuggestionList: React.FC<SuggestionListProps> = ({
  query,
  suggestions,
  onSelect,
  loading = false,
  emptyMessage = "No results",
  className,
  style,
  maxHeight = 320,
}) => {
  // Highlight helper: wraps matched substring(s) in <mark>
  const renderHighlighted = (label: string, q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return label;
    try {
      const esc = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${esc})`, "ig");
      const parts = label.split(regex);
      return (
        <>
          {parts.map((part, i) =>
            regex.test(part) ? (
              <mark key={i} style={{ background: "transparent", color: "var(--primary-color)" }}>
                {part}
              </mark>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          )}
        </>
      );
    } catch {
      return label;
    }
  };

  const showEmpty = !loading && suggestions.length === 0;

  return (
    <Paper
      elevation={6}
      className={className}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        marginTop: 8,
        background: "var(--background-dark)",
        color: "var(--text-color-light)",
        border: "1px solid var(--secondary-color)",
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
      role="listbox"
      aria-label="Search suggestions"
    >
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
          <CircularProgress size={18} />
          <span>Searching…</span>
        </div>
      )}

      {loading && suggestions.length > 0 && <Divider style={{ opacity: 0.2 }} />}

      {showEmpty ? (
        <div style={{ padding: "12px 14px", opacity: 0.8 }}>{emptyMessage}</div>
      ) : (
        <div style={{ maxHeight, overflowY: "auto" }}>
          <List disablePadding>
            {suggestions.map((sug, idx) => (
              <ListItemButton
                key={`${sug.mediaType}-${sug.id}-${idx}`}
                onClick={() => onSelect(sug)}
                role="option"
                aria-label={`${sug.label} (${sug.mediaType === "movie" ? "movie" : "tv"})`}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                  },
                }}
              >
                <ListItemText
                  primary={renderHighlighted(sug.label, query)}
                  secondary={
                    <Chip
                      label={sug.mediaType === "movie" ? "movie" : "tv"}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: 11,
                        borderColor: "var(--secondary-color)",
                        color: "var(--text-color-light)",
                        background: "transparent",
                      }}
                    />
                  }
                  primaryTypographyProps={{
                    sx: { color: "var(--text-color-light)" },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      )}
    </Paper>
  );
};

export default SuggestionList;
