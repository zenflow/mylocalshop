import React, { cloneElement } from 'react'
import { CreateButton, ExportButton, RefreshButton } from 'react-admin'
import { ActionsToolbar } from './ActionsToolbar'

export const ListActions = ({
  resource,
  filters,
  showFilter,
  displayedFilters,
  filterValues,
  hasCreate,
  basePath,
  exporter,
  total,
  currentSort,
  permanentFilter,
  maxResults,
}) => {
  return (
    <ActionsToolbar resource={resource}>
      {filters && cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
      {hasCreate && <CreateButton basePath={basePath} />}
      {exporter && <ExportButton
        exporter={exporter}
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={{ ...filterValues, ...permanentFilter }}
        maxResults={maxResults}
      />}
      <RefreshButton/>
    </ActionsToolbar>
  )
}
